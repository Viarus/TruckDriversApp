using FirebaseAdmin.Auth;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TruckCalculatorAppAPI.Models;
using TruckCalculatorAppAPI.Constants;
using TruckCalculatorAppAPI.Services;

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
            FireBase fireBase = new FireBase();

            FirebaseToken decodedToken;

            bool isTokenValid = false;
            string userToken = Request.Headers[PublicConstants.REQUEST_HEADER_TOKEN];
            string tokenUid = PublicConstants.DEFAULT_TOKEN_UID_INVALID;

            FirestoreDb db = fireBase.GetFirestoreDb();
            FirebaseAuth auth = FirebaseAuth.GetAuth(fireBase.GetFirebaseInstance());

            if (this.isUserTokenSetAsInvalidData(userToken))
            {
                return null; //TODO make a response
            }

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
            FireBase fireBase = new FireBase();

            FirestoreDb db = fireBase.GetFirestoreDb();

            DayInfo dayInfo;

            PostedData postedData;

            User currentUser = new User();

            FirebaseToken decodedToken;

            bool isTokenValid = false;

            string tokenUid = "";

            if (value.Token != "InvalidData")
            {
                FirebaseAuth auth = FirebaseAuth.GetAuth(fireBase.GetFirebaseInstance());

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
                    if (dayInfo.IsDayInfoValid(dayInfo))
                    {                        
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
            FireBase fireBase = new FireBase();

            string userToken = Request.Headers["token"];
            string docId = Request.Headers["docId"];

            if (userToken != "InvalidData")
            {
                FirestoreDb db = fireBase.GetFirestoreDb();
                FirebaseToken decodedToken;
                bool isTokenValid = false;
                string tokenUid = "";

                FirebaseAuth auth = FirebaseAuth.GetAuth(fireBase.GetFirebaseInstance());

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

        private bool isUserTokenSetAsInvalidData(string userToken)
        {
            if (userToken == PublicConstants.DEFAULT_TOKEN_INVALID) { return true; }
            else { return false; }
        }
    }
}
