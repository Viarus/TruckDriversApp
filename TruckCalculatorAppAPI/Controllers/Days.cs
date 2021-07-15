using FirebaseAdmin.Auth;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TruckCalculatorAppAPI.Models;
using TruckCalculatorAppAPI.Constants;
using TruckCalculatorAppAPI.Services;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TruckCalculatorAppAPI.Controllers
{
    [Route("api/[controller]")] //TODO fix routes
    [ApiController]
    public class Days : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            string token = Request.Headers[PublicConstants.REQUEST_HEADER_TOKEN];
            if (isUserTokenSetAsInvalidData(token)) { return BadRequest(PublicConstants.DEFAULT_TOKEN_INVALID_EXCEPTION); }

            FireBase fireBase = new();
            string tokenUid = "";
            FirebaseAuth auth = FirebaseAuth.GetAuth(fireBase.GetFirebaseInstance());

            try
            {
                FirebaseToken decodedToken = await auth.VerifyIdTokenAsync(token);
                tokenUid = decodedToken.Uid;
            }
            catch (Exception e)
            {
                return BadRequest(PublicConstants.TOKEN_INVALID_EXCEPTION);
            }
            FetchedData[] allFetchedDataArray = await fetchSavedDays(tokenUid, fireBase);
            return Ok(allFetchedDataArray);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] PostedData value)
        {
            if (isUserTokenSetAsInvalidData(value.Token)) { return BadRequest(PublicConstants.DEFAULT_TOKEN_INVALID_EXCEPTION); }

            FireBase fireBase = new();
            string tokenUid = "";
            FirebaseAuth auth = FirebaseAuth.GetAuth(fireBase.GetFirebaseInstance());

            try
            {
                FirebaseToken decodedToken = await auth.VerifyIdTokenAsync(value.Token);
                tokenUid = decodedToken.Uid;
            }
            catch (Exception e)
            {
                return BadRequest(PublicConstants.TOKEN_INVALID_EXCEPTION);
            }

            PostedData postedData = value;
            DayInfo dayInfo = postedData.ExtractDayInfo(postedData);
            if (dayInfo.IsDayInfoValid(dayInfo))
            {
                User currentUser = new User();
                FirestoreDb db = fireBase.GetFirestoreDb();
                currentUser = postedData.ExtractUser(postedData);
                string savedDayDocId = dayInfo.GetFileName(dayInfo);
                DocumentReference savedDayDocPath = db.Document(fireBase.getPathForSavingDay(tokenUid, savedDayDocId));
                Dictionary<string, object> dayInfoFirestoreObject = dayInfo.ConvertToFirestoreObject(dayInfo);

                await savedDayDocPath.SetAsync(dayInfoFirestoreObject);
                return Ok(PublicConstants.DAY_SAVED_SUCCESSFULLY_MESSAGE);
            }
            else { return BadRequest(PublicConstants.WRONG_DATA_EXCEPTION); }
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync()
        {
            FireBase fireBase = new FireBase(); //TODO refactor

            string token = Request.Headers[PublicConstants.REQUEST_HEADER_TOKEN];
            string docId = Request.Headers[PublicConstants.REQUEST_HEADER_DOC_ID];

            if (isUserTokenSetAsInvalidData(token)) { return BadRequest(PublicConstants.DEFAULT_TOKEN_INVALID_EXCEPTION); }

            FirestoreDb db = fireBase.GetFirestoreDb();
            FirebaseToken decodedToken;
            bool isTokenValid = false;
            string tokenUid = "";

            FirebaseAuth auth = FirebaseAuth.GetAuth(fireBase.GetFirebaseInstance());

            try
            {
                decodedToken = await auth.VerifyIdTokenAsync(token);
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

        private bool isUserTokenSetAsInvalidData(string userToken)
        {
            if (userToken == PublicConstants.DEFAULT_TOKEN_INVALID) { return true; }
            else { return false; }
        }
        private bool isDocumentValidForFetch(DocumentSnapshot documentSnapshot)
        {
            if (documentSnapshot.Id == PublicConstants.ID_DOCUMENT_FOR_COLLETION_CREATION) { return false; }
            return true;
        }
        private async Task<FetchedData[]> fetchSavedDays(string tokenUid, FireBase fireBase)
        {
            FirestoreDb db = fireBase.GetFirestoreDb();
            List<FetchedData> allFetchedData = new List<FetchedData>();
            FetchedData fetchedData = new FetchedData();
            string pathToSavedDays = fireBase.getPathToSavedDays(tokenUid);
            Query allDaysQuery = db.Collection(pathToSavedDays);
            QuerySnapshot allDaysQuerySnapshot = await allDaysQuery.GetSnapshotAsync();
            foreach (DocumentSnapshot documentSnapshot in allDaysQuerySnapshot.Documents)
            {
                if (!isDocumentValidForFetch(documentSnapshot)) { continue; }
                Dictionary<string, object> documentDictionary = documentSnapshot.ToDictionary();
                fetchedData = fetchedData.ToFetchedData(documentDictionary, documentSnapshot.Id);
                allFetchedData.Add(fetchedData);
            }
            allFetchedData.Sort((p, q) => q.DocId.CompareTo(p.DocId));
            return allFetchedData.ToArray();
        }
    }
}
