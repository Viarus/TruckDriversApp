﻿using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
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
            //FirebaseApp.Create(new AppOptions()
            //{
            //    Credential = GoogleCredential.GetApplicationDefault(),
            //});

            FireBase fireBase = new FireBase();
            FirebaseToken decodedToken;
            bool isTokenValid = false;
            string userToken = Request.Headers["token"];
            if (userToken == "InvalidData")
            {
                return null;
            }
            string tokenUid = "notValid";

            FirestoreDb db = FirestoreDb.Create(SecretConstants.project);
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
            //FirebaseApp.Create(new AppOptions()
            //{
            //    Credential = GoogleCredential.FromFile(PublicConstants.PATH_TO_FIREBASE_CRED_FILE_MAC),
            //});

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
            //FirebaseApp.Create(new AppOptions()
            //{
            //    Credential = GoogleCredential.GetApplicationDefault(),
            //});

            FireBase fireBase = new FireBase();
            string userToken = Request.Headers["token"];
            string docId = Request.Headers["docId"];

            if (userToken != "InvalidData")
            {
                FirestoreDb db = FirestoreDb.Create(SecretConstants.project);
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
    }
}
