using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using TruckCalculatorAppAPI.Constants;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using System;
using Google.Api.Gax.Grpc;

namespace TruckCalculatorAppAPI.Services
{
    public class FireBase
    {
        private GoogleCredential credential = GoogleCredential.FromFile(PublicConstants.PATH_TO_FIREBASE_CRED_FILE_MAC);

        private FirestoreClient client = new FirestoreClientBuilder()
        {
            CredentialsPath = PublicConstants.PATH_TO_FIREBASE_CRED_FILE_MAC
        }.Build();

        public FireBase()
        {
        }

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
    }
}
