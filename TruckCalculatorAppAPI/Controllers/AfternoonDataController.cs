using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TruckCalculatorAppAPI.Models;
using Google.Cloud.Firestore;
using FirebaseAdmin.Auth;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Hosting;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TruckCalculatorAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AfternoonDataController : ControllerBase
    {
        // GET: api/<AfternoonDataController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AfternoonDataController>/5
        [HttpGet("{id}")]
        public string Get(string id)
        {
            return "value";
        }

        // POST api/<AfternoonDataController>
        [HttpPost]
        public async void Post([FromBody] PostedData value)
        {
            FirestoreDb db = FirestoreDb.Create(TemporarySecretClass.project);
            DataToBePostedAfternoon dayInfo;
            PostedData postedData;
            User currentUser = new User();

            FirebaseApp firebaseApp = FirebaseApp.DefaultInstance;
            if (firebaseApp == null)
            {
                string credentials = @"D:\Projekty PROGRAMOWANIE\Csharp\TruckDriversApp\TruckCalculatorAppAPI\firebaseCred.json";
                string projectId = TemporarySecretClass.project;
                firebaseApp = FirebaseApp.Create(new AppOptions() { ProjectId = projectId, Credential = GoogleCredential.FromFile(credentials) });
            }
            FirebaseAuth auth = FirebaseAuth.GetAuth(firebaseApp);
            FirebaseToken decodedToken = await auth.VerifyIdTokenAsync(value.Token);
            string tokenUid = decodedToken.Uid;            
            currentUser.Uid = value.Uid;

            //I think this validation isn't necessary. Just get UID from the token.
            if (currentUser.Uid == tokenUid)
            {
                postedData = value;
                dayInfo = postedData.ExtractDayInfo(postedData);

                string savedDayDocId = dayInfo.GetFileName(dayInfo);
                DocumentReference savedDayDocPath = db.Document("users/" + currentUser.Uid + "/savedDays/" + savedDayDocId);

                Dictionary<string, object> dayInfoFirestoreObject = dayInfo.ConvertToFirestoreObject(dayInfo);
                await savedDayDocPath.SetAsync(dayInfoFirestoreObject);
            }
        }

        // PUT api/<AfternoonDataController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE api/<AfternoonDataController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
