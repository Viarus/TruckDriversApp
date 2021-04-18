using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TruckCalculatorAppAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TruckCalculatorAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Days : ControllerBase
    {
        [HttpGet]
        public async System.Threading.Tasks.Task<FetchedData[]> GetAsync()
        {
            FirebaseToken decodedToken;
            bool isTokenValid = false;
            string userToken = Request.Headers["token"];
            if (userToken == "InvalidData")
            {
                return null;
            }
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
                Query allDaysQuery = db.Collection("users/" + tokenUid + "/savedDays");
                QuerySnapshot allDaysQuerySnapshot = await allDaysQuery.GetSnapshotAsync();
                foreach (DocumentSnapshot documentSnapshot in allDaysQuerySnapshot.Documents)
                {
                    if (documentSnapshot.Id == "fileCreatedJustForCollection")
                    {
                        break;
                    }
                    else
                    {
                        Dictionary<string, object> documentDictionary = documentSnapshot.ToDictionary();
                        fetchedData = fetchedData.ToFetchedData(documentDictionary, documentSnapshot.Id);
                        allFetchedData.Add(fetchedData);
                    }
                }
                allFetchedData.Sort((p, q) => q.DocId.CompareTo(p.DocId));
                FetchedData[] allFetchedDataArray = allFetchedData.ToArray();

                return allFetchedDataArray;
            }
            else
            {
                return null;
            }
        }
        [HttpPost]
        public async void Post([FromBody] PostedData value)
        {
            FirestoreDb db = FirestoreDb.Create(TemporarySecretClass.project);
            DataToBePostedAfternoon dayInfo;
            PostedData postedData;
            User currentUser = new User();
            FirebaseToken decodedToken;
            bool isTokenValid = false;
            string tokenUid = "";

            if (value.Token != "InvalidData")
            {
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
                    if (postedData.IsDayInfoValid(postedData))
                    {
                        dayInfo = postedData.ExtractDayInfo(postedData);
                        currentUser = postedData.ExtractUser(postedData);
                        currentUser.Uid = tokenUid;

                        string savedDayDocId = dayInfo.GetFileName(dayInfo);
                        DocumentReference savedDayDocPath = db.Document("users/" + currentUser.Uid + "/savedDays/" + savedDayDocId);

                        Dictionary<string, object> dayInfoFirestoreObject = dayInfo.ConvertToFirestoreObject(dayInfo);
                        await savedDayDocPath.SetAsync(dayInfoFirestoreObject);
                    }
                }
            }            
        }
        [HttpDelete]
        public async void Delete()
        {
            string userToken = Request.Headers["token"];
            string docId = Request.Headers["docId"];

            if (userToken != "InvalidData")
            {
                FirestoreDb db = FirestoreDb.Create(TemporarySecretClass.project);
                FirebaseToken decodedToken;
                bool isTokenValid = false;
                string tokenUid = "";

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
                    DocumentReference savedDayDocPath = db.Document("users/" + tokenUid + "/savedDays/" + docId);
                    await savedDayDocPath.DeleteAsync();
                }
            }
        }
    }
}
