import { Injectable } from "@angular/core";
import { DayInfo } from "Models/DayInfo";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class DataService {
    date: Date = new Date();
    newDayInputEmmiter: Subject<DayInfo> = new Subject<DayInfo>();

    newDayInfo: DayInfo = new DayInfo();

    updateNewDayTimes(TimeOfStart?: number, TimeOfFinish?: number, TimeOfStart2?: number, TimeOfFinish2?: number) {
        if (TimeOfStart) {
            this.newDayInfo.TimeOfStart = TimeOfStart;
        }
        if (TimeOfFinish) {
            this.newDayInfo.TimeOfFinish = TimeOfFinish;
        }
        if (TimeOfStart2) {
            this.newDayInfo.TimeOfStart2 = TimeOfStart2;
        }
        if (TimeOfFinish2) {
            this.newDayInfo.TimeOfFinish2 = TimeOfFinish2;
        }
    }
    updateNewDayDates(Day: number, DayOfWeek: number, Month: number, Year: number){
        if (Day){
            this.newDayInfo.Day = Day;
        }
        if (DayOfWeek){
            this.newDayInfo.DayOfWeek = DayOfWeek;
        }
        if (Month){
            this.newDayInfo.Month = Month;
        }
        if (Year){
            this.newDayInfo.Year = Year;
        }
    }
    resetNewDayTime(){
        this.newDayInfo.TimeOfStart = 0;
        this.newDayInfo.TimeOfFinish = 720;
        this.newDayInfo.TimeOfStart2 = 900;
        this.newDayInfo.TimeOfFinish2 = 1260;
        this.newDayInfo.AddAfternoonTime = false;
    }
    setTodayDate(){
        this.newDayInfo.Day = this.date.getDate();
        this.newDayInfo.DayOfWeek = this.date.getDay();
        this.newDayInfo.Month = (this.date.getMonth() + 1);
        this.newDayInfo.Year = this.date.getFullYear();
    }
    getNewDayInfo(){
        return this.newDayInfo;
    }

}