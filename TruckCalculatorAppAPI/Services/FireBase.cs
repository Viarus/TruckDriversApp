using Google.Cloud.Firestore;
using TruckCalculatorAppAPI.Constants;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace TruckCalculatorAppAPI.Services
{
    public class FireBase
    {
        public FireBase()
        {
        }

        public FirestoreDb GetFirestoreDb()
        {
            return FirestoreDb.Create(SecretConstants.project);
        }

        public FirebaseApp GetFirebaseInstance()
        {
            FirebaseApp firebaseApp = FirebaseApp.DefaultInstance;
            if (firebaseApp == null)
            {
                firebaseApp = FirebaseApp.Create(new AppOptions() { ProjectId = SecretConstants.project, Credential = GoogleCredential.FromFile(PublicConstants.PATH_TO_FIREBASE_CRED_FILE_MAC) });
            }
            return firebaseApp;
        }
    }
}
