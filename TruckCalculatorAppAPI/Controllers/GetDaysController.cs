using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TruckCalculatorAppAPI.Models;

namespace TruckCalculatorAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetDaysController : ControllerBase
    {
        // GET: api/<GetDaysController>
        [HttpGet]
        public async System.Threading.Tasks.Task<FetchedData[]> GetAsync()
        {
            FirebaseToken decodedToken;
            bool isTokenValid = false;
            string userToken = Request.Headers["token"];
            string tokenUid = "notValid";

            FirestoreDb db = FirestoreDb.Create(TemporarySecretClass.project);
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
                decodedToken = await auth.VerifyIdTokenAsync(userToken);
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
                List<FetchedData> allFetchedData = new List<FetchedData>();
                FetchedData fetchedData = new FetchedData();
                Query allDaysQuery = db.Collection("users/"+ tokenUid + "/savedDays");
                QuerySnapshot allDaysQuerySnapshot = await allDaysQuery.GetSnapshotAsync();
                foreach (DocumentSnapshot documentSnapshot in allDaysQuerySnapshot.Documents)
                {
                    Dictionary<string, object> documentDictionary = documentSnapshot.ToDictionary();
                    fetchedData = fetchedData.ToFetchedData(documentDictionary, documentSnapshot.Id);
                    allFetchedData.Add(fetchedData);
                }
                allFetchedData.Sort((p, q) => p.DocId.CompareTo(q.DocId));
                FetchedData[] allFetchedDataArray = allFetchedData.ToArray();

                return allFetchedDataArray;
            }
            else
            {
                return null;
            }
        }
    }
}
