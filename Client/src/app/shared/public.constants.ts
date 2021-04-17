import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PublicConstants {
    
    //remember to change value in models manually
    readonly defaultInvalid: string = "InvalidData";
    readonly defaultValueForTime: number = 2000;
    readonly defaultValueStart1: number = 0;
    readonly defaultValueFinish1: number = 1440;

    //showable
    lang: string = localStorage.getItem('lang') || 'en';

    readonly generalError = this.lang == 'en' ? "An error occured" : "Wystąpił błąd";
    readonly wrongDataEnteredError = this.lang == 'en' ? "Wrong Data Entered" : "Wprowadzono złe dane";
    
    readonly loginSuccess = this.lang == 'en' ? "Logged in" : "Zalogowano pomyślnie";
    readonly logoutSuccess = this.lang == 'en' ? "Logged out" : "Wylogowano pomyślnie";

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