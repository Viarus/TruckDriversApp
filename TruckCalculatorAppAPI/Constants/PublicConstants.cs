using System;
namespace TruckCalculatorAppAPI.Constants
{
    public static class PublicConstants
    {
        //Request fields
        public const string REQUEST_HEADER_TOKEN = "token";

        //FRONTEND CONSISTENS
        public const string DEFAULT_TOKEN_INVALID = "InvalidData";
        public const string DEFAULT_TOKEN_UID_INVALID = "notValid";

        //FIREBASE CREDENTIAL PATHS
        public const string PATH_TO_FIREBASE_CRED_FILE_MAC = "/Users/mateusz.ostrowski/Sites/aaa/TruckDriversApp/TruckCalculatorAppAPI/truckappCred.json";
        public const string PATH_TO_FIREBASE_CRED_FILE_PC = @"D:\Projekty PROGRAMOWANIE\Csharp\TruckDriversApp\TruckCalculatorAppAPI\firebaseCred.json";

    }
}
