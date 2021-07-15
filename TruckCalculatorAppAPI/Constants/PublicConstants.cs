using System;
namespace TruckCalculatorAppAPI.Constants
{
    public static class PublicConstants
    {
        //Request fields
        public const string REQUEST_HEADER_TOKEN = "token";
        public const string REQUEST_HEADER_DOC_ID = "docId";

        //FRONTEND CONSISTENS
        public const string DEFAULT_TOKEN_INVALID = "InvalidData";
        public const string DEFAULT_TOKEN_UID_INVALID = "notValid";

        //FIREBASE DATABASE
        public const string PATH_USERS = "users";
        public const string PATH_SAVED_DAYS = "savedDays";
        public const string ID_DOCUMENT_FOR_COLLETION_CREATION = "fileCreatedJustForCollection";

        //RESPONSES MESSAGES

        public const string DAY_SAVED_SUCCESSFULLY_MESSAGE = "Day has been saved successfully.";

        //ERRORS/EXCEPTIONS/BAD RESPONSES
        public const string DEFAULT_TOKEN_INVALID_EXCEPTION = "Token is set as a invalid data.";
        public const string TOKEN_INVALID_EXCEPTION = "Token is invalid.";
        public const string WRONG_DATA_EXCEPTION = "Provided data is invalid";

        //FIREBASE CREDENTIAL PATHS
        public const string PATH_TO_FIREBASE_CRED_FILE_MAC = "/Users/mateusz.ostrowski/Sites/aaa/TruckDriversApp/TruckCalculatorAppAPI/truckappCred.json";
        public const string PATH_TO_FIREBASE_CRED_FILE_PC = @"D:\Projekty PROGRAMOWANIE\Csharp\TruckDriversApp\TruckCalculatorAppAPI\firebaseCred.json";

    }
}
