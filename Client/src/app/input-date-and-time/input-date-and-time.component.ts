import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { DayInfo } from '../../../Models/DayInfo';
import { DataService } from '../shared/data/data.service';

@Component({
  selector: 'app-input-date-and-time',
  templateUrl: './input-date-and-time.component.html',
  styleUrls: ['./input-date-and-time.component.css']
})
export class InputDateAndTimeComponent implements OnDestroy, OnInit {
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    this.newDayInfo = this.getNewDayInfo();
    this.dataService.setTodayDate();
  }

  ngOnDestroy() {
    this.newDayInfoSubscription.unsubscribe();
  }

  newDayInfoSubject: Subject<DayInfo> = new Subject<DayInfo>();
  newDayInfoSubscription: Subscription = this.newDayInfoSubject.subscribe(data => {
    if (this.showNewTimeRange) {
      this.dataService.newDayInputEmmiter.next(this.newDayInfo);
    }
    else {
      this.newDayInfo.TimeOfStart2 = 2000;
      this.newDayInfo.TimeOfFinish2 = 2000;
      this.dataService.newDayInputEmmiter.next(this.newDayInfo);
    }
  })

  newDayInfo: DayInfo = new DayInfo();

  inputedDate: Date = new Date();

  timeOfStartHolder: number = 0;
  timeOfFinishHolder: number = 0;

  notStartedTodayInput: boolean = false;
  notFinishedTodayInput: boolean = false;

  notFinishedTodayInput2: boolean = false;
  isDayWorkedTimeCorrect2: boolean = true;

  //isDayWorkedTimeCorrect: boolean = true;

  timeOfStartHolder2: number = 2000;
  timeOfFinishHolder2: number = 2000;

  timeOfStartHolder2ForTimePicker = { hour: 2000, minute: 2000 };
  timeOfFinishHolder2ForTimePicker = { hour: 2000, minute: 2000 };

  showNewTimeRange: boolean = false;
  showNewTimeRangeButton: boolean = true;

  //dataToBePostedMorning: DayInfo = new DayInfo();
  dataToBePostedAfternoon: DayInfo = new DayInfo();

  setToday() {
    this.dataService.setTodayDate();
  }

  getNewDayInfo(): DayInfo {
    return this.dataService.getNewDayInfo()
  }

  /* updateMorningDate() {
    this.dataToBePostedMorning.Day = this.inputedDate.getDate();
    this.dataToBePostedMorning.DayOfWeek = this.inputedDate.getDay();
    this.dataToBePostedMorning.Month = (this.inputedDate.getMonth() + 1);
    this.dataToBePostedMorning.Year = this.inputedDate.getFullYear();
  } */

  updateAfternoonDate() {
    this.dataToBePostedAfternoon.Day = this.inputedDate.getDate();
    this.dataToBePostedAfternoon.DayOfWeek = this.inputedDate.getDay();
    this.dataToBePostedAfternoon.Month = (this.inputedDate.getMonth() + 1);
    this.dataToBePostedAfternoon.Year = this.inputedDate.getFullYear();
    this.dataToBePostedAfternoon.AddAfternoonTime = this.showNewTimeRange;
  }

  /* updateMorningTime() {
    this.dataToBePostedMorning.TimeOfStart = this.newDayInfo.TimeOfStart;
    this.dataToBePostedMorning.TimeOfFinish = this.newDayInfo.TimeOfFinish;
  } */

  updateAfternooonTime() {
    this.dataToBePostedAfternoon.TimeOfStart = this.newDayInfo.TimeOfStart;
    this.dataToBePostedAfternoon.TimeOfFinish = this.newDayInfo.TimeOfFinish;
    this.dataToBePostedAfternoon.TimeOfStart2 = this.newDayInfo.TimeOfStart2;
    this.dataToBePostedAfternoon.TimeOfFinish2 = this.newDayInfo.TimeOfFinish2;
  }

  onStartedChecked() {
    if (this.notStartedTodayInput) {
      this.timeOfStartHolder = this.newDayInfo.TimeOfStart;
      this.newDayInfo.TimeOfStart = 0;
    }
    else if ((!(this.notStartedTodayInput)) && (this.timeOfStartHolder !== null)) {
      this.newDayInfo.TimeOfStart = this.timeOfStartHolder;
    }
  }

  onFinishedChecked() {
    if (this.notFinishedTodayInput) {
      this.timeOfFinishHolder = this.newDayInfo.TimeOfFinish;
      this.newDayInfo.TimeOfFinish = 1440;
    }
    else if ((!(this.notFinishedTodayInput)) && (this.timeOfFinishHolder !== null)) {
      this.newDayInfo.TimeOfFinish = this.timeOfFinishHolder;
    }
  }

  onFinishedChecked2() {
    if (this.notFinishedTodayInput2) {
      this.timeOfFinishHolder2 = this.newDayInfo.TimeOfFinish2;
      this.newDayInfo.TimeOfFinish2 = 1440;
    }
    else if ((!(this.notFinishedTodayInput)) && (this.timeOfFinishHolder !== null)) {
      this.newDayInfo.TimeOfFinish2 = this.timeOfFinishHolder2;
    }
  }

  saveTime(timeHolder: { timeOfStart: { hour: number, minute: number }, timeOfFinish: { hour: number, minute: number } }) {
    this.newDayInfo.TimeOfStart = this.toMinutesOnly(timeHolder.timeOfStart);
    if ((timeHolder.timeOfFinish.minute == 0) && (timeHolder.timeOfFinish.hour == 0)) {
      this.newDayInfo.TimeOfFinish = 1440;
    }
    else {
      this.newDayInfo.TimeOfFinish = this.toMinutesOnly(timeHolder.timeOfFinish);
    }
    if (this.notFinishedTodayInput) {
      this.newDayInfo.TimeOfFinish = 1440;
    }
    else if (this.notStartedTodayInput) {
      this.newDayInfo.TimeOfStart = 0;
    }
    if (!this.showNewTimeRange) {
      this.newDayInfo.TimeOfStart2 = 2000;
      this.newDayInfo.TimeOfFinish2 = 2000;
      this.newDayInfo.AddAfternoonTime = false;
      this.newDayInfoSubject.next(this.newDayInfo);
    }
  }

  saveTime2(timeHolder: { timeOfStart: { hour: number, minute: number }, timeOfFinish: { hour: number, minute: number } }) {
    //this.isDayWorkedTimeCorrect2 = true;
    this.newDayInfo.TimeOfStart2 = this.toMinutesOnly(timeHolder.timeOfStart);
    if ((timeHolder.timeOfFinish.minute == 0) && (timeHolder.timeOfFinish.hour == 0)) {
      this.newDayInfo.TimeOfFinish2 = 1440;
    }
    else {
      this.newDayInfo.TimeOfFinish2 = this.toMinutesOnly(timeHolder.timeOfFinish);
    }
    if (this.notFinishedTodayInput2) {
      this.newDayInfo.TimeOfFinish2 = 1440;
    }
    if (this.showNewTimeRange) {
      this.newDayInfo.AddAfternoonTime = true;
      this.newDayInfoSubject.next(this.newDayInfo);
    }
  }

  saveDate(dateHolder: Date) {
    this.newDayInfo.Day = dateHolder.getDate();
    this.newDayInfo.DayOfWeek = dateHolder.getDay();
    this.newDayInfo.Month = (dateHolder.getMonth() + 1);
    this.newDayInfo.Year = dateHolder.getFullYear();
  }

  toMinutesOnly(timeHolder: { hour: number, minute: number }) {
    return (timeHolder.hour * 60) + timeHolder.minute;
  }

  toNormalTime(minutesHolder: number) {
    let minutes = minutesHolder % 60;
    let hours = Math.floor(minutesHolder / 60);
    let time: { hour: number, minute: number } = { hour: hours, minute: minutes }
    return time;
  }

  /* getDayWorkedTime() {
    if ((this.newDayInfo.TimeOfFinish - this.newDayInfo.TimeOfStart) < 0) {
      this.isDayWorkedTimeCorrect = false;
    }
    else {
      if (!this.showNewTimeRange) {
        this.updateMorningDate();
        this.updateMorningTime();
        this.isDayWorkedTimeCorrect = true;
        this.http.post('https://localhost:44396/api/daysdata', this.dataToBePostedMorning).subscribe();
      }
      else {
        this.getDayWorkedTime2();
      }
    }
  } */

  getDayWorkedTime2() {
    if ((this.newDayInfo.TimeOfStart > this.newDayInfo.TimeOfStart2) || (this.newDayInfo.TimeOfStart2 < this.newDayInfo.TimeOfFinish) || ((this.newDayInfo.TimeOfFinish2 - this.newDayInfo.TimeOfStart2) < 0)) {
      this.isDayWorkedTimeCorrect2 = false;
    }
    else {
      this.isDayWorkedTimeCorrect2 = true;
      this.updateAfternoonDate();
      this.updateAfternooonTime();
      this.http.post('https://localhost:44396/api/daysdata', this.dataToBePostedAfternoon).subscribe();
    }
  }

  onShowNewTimeRange() {
    this.showNewTimeRange = true;
    this.showNewTimeRangeButton = false;
  }

  onHideNewTimeRange() {
    this.showNewTimeRange = false;
    this.showNewTimeRangeButton = true;
    this.timeOfStartHolder2 = this.newDayInfo.TimeOfStart2;
    this.timeOfFinishHolder2 = this.newDayInfo.TimeOfFinish2;
    if (this.timeOfStartHolder2 != 2000) {
      this.timeOfStartHolder2ForTimePicker = this.toNormalTime(this.timeOfStartHolder2);
    }
    if (this.timeOfFinishHolder2 != 2000) {
      this.timeOfFinishHolder2ForTimePicker = this.toNormalTime(this.timeOfFinishHolder2);
    }

  }

}
