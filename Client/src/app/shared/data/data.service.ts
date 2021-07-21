import {Injectable} from '@angular/core';
import {DayInfo} from 'src/app/shared/models/dayInfo.model';
import {Subject} from 'rxjs';
import {PublicConstants} from '../constants/public.constants';

@Injectable({providedIn: 'root'})

export class DataService {
  date: Date = new Date();
  newDayInputEmitter: Subject<DayInfo> = new Subject<DayInfo>();

  newDayInfo: DayInfo = new DayInfo();

  updateNewDayTimes(TimeOfStart: number, TimeOfFinish: number, TimeOfStart2?: number, TimeOfFinish2?: number): void {
    this.newDayInfo.TimeOfStart = TimeOfStart;
    this.newDayInfo.TimeOfFinish = TimeOfFinish;
    if (!!TimeOfStart2) {
      this.newDayInfo.TimeOfStart2 = TimeOfStart2;
    }
    if (!!TimeOfFinish2) {
      this.newDayInfo.TimeOfFinish2 = TimeOfFinish2;
    }
    this.newDayInputEmitter.next(this.newDayInfo);
  }

  updateNewDayDates(Day: number, DayOfWeek: number, Month: number, Year: number): void {
    if (Day) {
      this.newDayInfo.Day = Day;
    }
    if (DayOfWeek) {
      this.newDayInfo.DayOfWeek = DayOfWeek;
    }
    if (Month) {
      this.newDayInfo.Month = Month;
    }
    if (Year) {
      this.newDayInfo.Year = Year;
    }
  }

  resetNewDayTime(): void {
    this.newDayInfo.TimeOfStart = PublicConstants.DEFAULT_TIME_OF_START;
    this.newDayInfo.TimeOfFinish = PublicConstants.DEFAULT_TIME_OF_FINISH;
    this.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_TIME_OF_START_2;
    this.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_TIME_OF_FINISH_2;
    this.newDayInfo.AddAfternoonTime = false;
  }

  setTodayDate(): void {
    this.newDayInfo.Day = this.date.getDate();
    this.newDayInfo.DayOfWeek = this.date.getDay();
    this.newDayInfo.Month = (this.date.getMonth() + 1);
    this.newDayInfo.Year = this.date.getFullYear();
  }

  getNewDayInfo(): DayInfo {
    return this.newDayInfo;
  }

}

export const dataService: DataService = new DataService();
