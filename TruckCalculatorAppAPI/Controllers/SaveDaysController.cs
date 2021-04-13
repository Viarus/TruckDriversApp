using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TruckCalculatorAppAPI.Models;
using Google.Cloud.Firestore;
using FirebaseAdmin.Auth;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using System;

namespace TruckCalculatorAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaveDaysController : ControllerBase
    {
        // POST api/<SaveDaysController>
        [HttpPost]
        public async void Post([FromBody] PostedData value)
        {
            FirestoreDb db = FirestoreDb.Create(TemporarySecretClass.project);
            DataToBePostedAfternoon dayInfo;
            PostedData postedData;
            User currentUser = new User();
            FirebaseToken decodedToken;
            bool isTokenValid = false;
            string tokenUid;

            FirebaseApp firebaseApp = FirebaseApp.DefaultInstance;
            if (firebaseApp == null)
            {
                string credentials = @"D:\Projekty PROGRAMOWANIE\Csharp\TruckDriversApp\TruckCalculatorAppAPI\firebaseCred.json";
                string projectId = TemporarySecretClass.project;
                firebaseApp = FirebaseApp.Create(new AppOptions() { ProjectId = projectId, Credential = GoogleCredential.FromFile(credentials) });
            }
            FirebaseAuth auth = FirebaseAuth.GetAuth(firebaseApp);

            try
            {
                decodedToken = await auth.VerifyIdTokenAsync(value.Token);
                isTokenValid = true;
                tokenUid = decodedToken.Uid;
            }
            catch (Exception e)
            {
                isTokenValid = false;
                Console.WriteLine(e.Message);
            }

            if (isTokenValid)
            {
                postedData = value;
                dayInfo = postedData.ExtractDayInfo(postedData);
                currentUser = postedData.ExtractUser(postedData);

                string savedDayDocId = dayInfo.GetFileName(dayInfo);
                DocumentReference savedDayDocPath = db.Document("users/" + currentUser.Uid + "/savedDays/" + savedDayDocId);

                Dictionary<string, object> dayInfoFirestoreObject = dayInfo.ConvertToFirestoreObject(dayInfo);
                await savedDayDocPath.SetAsync(dayInfoFirestoreObject);
            }
        }
    }
}
