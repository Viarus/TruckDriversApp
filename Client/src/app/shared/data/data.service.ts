import {Injectable} from '@angular/core';
import {DayInfo} from 'src/app/shared/models/dayInfo.model';
import {Subject} from 'rxjs';
import {PublicConstants} from '../constants/public.constants';

@Injectable({providedIn: 'root'})

export class DataService {
  date: Date = new Date();
  newDayInputEmitter: Subject<DayInfo> = new Subject<DayInfo>();

  newDayInfo: DayInfo = new DayInfo();

  isNotTodayStartedChecked = false;
  isNotTodayFinishedChecked = false;
  isNotTodayFinishedChecked2 = false;

  updateNewDayTimes(TimeOfStart?: number, TimeOfFinish?: number, TimeOfStart2?: number, TimeOfFinish2?: number): void {
    if (!!TimeOfStart) {
      this.newDayInfo.TimeOfStart = TimeOfStart;
    }
    if (!!TimeOfFinish) {
      this.newDayInfo.TimeOfFinish = TimeOfFinish;
    }
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
    this.newDayInfo.TimeOfStart = PublicConstants.DEFAULT_TIME_OF_START_IN_MINUTES;
    this.newDayInfo.TimeOfFinish = PublicConstants.DEFAULT_TIME_OF_FINISH_IN_MINUTES;
    this.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_TIME_OF_START_2_IN_MINUTES;
    this.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_TIME_OF_FINISH_2_IN_MINUTES;
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

  setAddAfternoonTime(a: boolean): void {
    this.newDayInfo.AddAfternoonTime = a;
  }

  isNewDayValid(): boolean {
    if (this.newDayInfo.TimeOfStart >= this.newDayInfo.TimeOfFinish) {
      return false;
    } else if ((this.newDayInfo.TimeOfStart2 >= this.newDayInfo.TimeOfFinish2) && this.newDayInfo.AddAfternoonTime) {
      return false;
    } else if ((this.newDayInfo.TimeOfStart2 <= this.newDayInfo.TimeOfFinish) && this.newDayInfo.AddAfternoonTime) {
      return false;
    } else if (this.newDayInfo.TimeOfStart < 0 || this.newDayInfo.TimeOfFinish2 > 1440) {
      return false;
    }
    return true;
  }

}

export const dataService: DataService = new DataService();
