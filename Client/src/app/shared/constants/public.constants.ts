import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PublicConstants {
    
    //remember to change value in models manually
    readonly defaultInvalid: string = "InvalidData";
    readonly defaultValueForTime: number = 2000;
    readonly defaultValueStart1: number = 0;
    readonly defaultValueFinish1: number = 1440;

    //COMMUNICATION WITH API
    static readonly GUEST_ACCOUNT_EMAIL = "guestAccount@guest.com"; //cloud functions
    static readonly HEADER_DOC_ID = 'docId';
    static readonly HEADER_TOKEN = 'token';

    static readonly DAY_INFO_PROPERTY_DOC_ID = 'docId';
    static readonly DAY_INFO_PROPERTY_TIME_OF_START = 'timeOfStart';
    static readonly DAY_INFO_PROPERTY_TIME_OF_START_2 = 'timeOfStart2';
    static readonly DAY_INFO_PROPERTY_TIME_OF_FINISH = 'timeOfFinish';
    static readonly DAY_INFO_PROPERTY_TIME_OF_FINISH_2 = 'timeOfFinish2';
    static readonly DAY_INFO_PROPERTY_DAY = 'day';
    static readonly DAY_INFO_PROPERTY_DAY_OF_WEEK = 'dayOfWeek';
    static readonly DAY_INFO_PROPERTY_MONTH = 'month';
    static readonly DAY_INFO_PROPERTY_YEAR = 'year';
    static readonly DAY_INFO_PROPERTY_ADD_AFTERNOON_TIME = 'addAfternoonTime';
    
    //AUTHENTICATION
    static readonly LOCAL_STORAGE_USER_DATA = 'userData';

    //ROUTER

    static readonly ROUTER_PATH_TO_LOGIN = '/login';

    //showable
    lang: string = localStorage.getItem('lang') || 'en';

    readonly generalError = this.lang == 'en' ? "An error occured" : "Wystąpił błąd";
    readonly wrongDataEnteredError = this.lang == 'en' ? "Wrong Data Entered" : "Wprowadzono złe dane";
    
    readonly loginSuccess = this.lang == 'en' ? "Logged in" : "Zalogowano pomyślnie";
    readonly logoutSuccess = this.lang == 'en' ? "Logged out" : "Wylogowano pomyślnie";
    readonly needForLogIn = this.lang == 'en' ? 'Please log in first (you can use the "Log In as a Guest" option)' : 'Proszę się zalogować (można użyć opcji "Zaloguj się jako gość")';

    readonly savingSuccess = this.lang == 'en' ? "Day has been saved successfully." : "Dzień został zapisany.";
    readonly deleteSuccess = this.lang == 'en' ? "Day has been deleted successfully." : "Dzień został usunięty.";

    readonly monday = this.lang == 'en' ? "Monday" : "Poniedziałek";
    readonly tuesday = this.lang == 'en' ? "Tuesday" : "Wtorek";
    readonly wednesday = this.lang == 'en' ? "Wednesday" : "Środa";
    readonly thursday = this.lang == 'en' ? "Thursday" : "Czwartek";
    readonly friday = this.lang == 'en' ? "Friday" : "Piątek";
    readonly saturday = this.lang == 'en' ? "Saturday" : "Sobota";
    readonly enterDay = this.lang == 'en' ? "Please Enter a Day" : "Wprowadź dzień";
}