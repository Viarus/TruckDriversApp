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
        FirestoreDb db = FirestoreDb.Create(TemporarySecretClass.project);        

        List<DataToBePosted> timeInDay = new List<DataToBePosted>();
        IdCounter lastId = new IdCounter();
        GetHeader getHeader = new GetHeader();

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

            //User currentUser = new User();

            //DataToBePostedAfternoon converter = new DataToBePostedAfternoon();
            //EnteredDay enteredDay = new EnteredDay();

            //string fileTitle = enteredDay.GetFileName(value.Day, value.Month, value.Year);

            //DocumentReference saveDataPath = db.Document("users/pablo/savedDays/" + fileTitle);

            //Dictionary<string, object> dayInfo = converter.ConvertToFirestoreObject(value);
            //await saveDataPath.SetAsync(dayInfo);

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
