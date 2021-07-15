using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using TruckCalculatorAppAPI.Constants;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace TruckCalculatorAppAPI.Services
{
    public class FireBase
    {
        private GoogleCredential credential = GoogleCredential.FromFile(PublicConstants.PATH_TO_FIREBASE_CRED_FILE_MAC);

        private FirestoreClient client = new FirestoreClientBuilder()
        {
            CredentialsPath = PublicConstants.PATH_TO_FIREBASE_CRED_FILE_MAC
        }.Build();

        public FirestoreDb GetFirestoreDb()
        {
            return FirestoreDb.Create(SecretConstants.project, client);
        }

        public FirebaseApp GetFirebaseInstance()
        {
            FirebaseApp firebaseApp = FirebaseApp.DefaultInstance;
            if (firebaseApp == null)
            {
                firebaseApp = FirebaseApp.Create(new AppOptions() { ProjectId = SecretConstants.project, Credential = credential });
            }
            return firebaseApp;
        }

        public string getPathToSavedDays(string tokenUid)
        {
            return PublicConstants.PATH_USERS + "/" + tokenUid + "/" + PublicConstants.PATH_SAVED_DAYS;
        }

        public string getPathForSavingDay(string tokenUid, string savedDayDocId)
        {
            return getPathToSavedDays(tokenUid) + "/" + savedDayDocId;
        }
    }
}
