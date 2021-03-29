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
export class InputDateAndTimeComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.dataToBePostedAfternoonSubscription.unsubscribe();
  }

  dataToBePostedAfternoonSubject: Subject<DayInfo> = new Subject<DayInfo>();
  dataToBePostedAfternoonSubscription: Subscription = this.dataToBePostedAfternoonSubject.subscribe(data => {
    if (this.showNewTimeRange) {
      this.dataService.newDayInputEmmiter.next(this.dataToBePostedAfternoon);
    }
    else {
      this.dataService.newDayInputEmmiter.next(this.dataToBePostedMorning);
    }
  })

  inputedDate: Date = new Date();

  timeOfStart: number = 0;
  timeOfFinish: number = 1260;

  timeOfStartHolder: number = 0;
  timeOfFinishHolder: number = 0;

  notStartedTodayInput: boolean = false;
  notFinishedTodayInput: boolean = false;

  isDayWorkedTimeCorrect: boolean = true;

  timeOfStart2 = 0;
  timeOfFinish2 = 1260;

  timeOfStartHolder2: number = 0;
  timeOfFinishHolder2: number = 0;

  notFinishedTodayInput2: boolean = false;

  isDayWorkedTimeCorrect2: boolean = true;

  showNewTimeRange: boolean = false;
  showNewTimeRangeButton: boolean = true;

  dataToBePostedMorning: DayInfo = new DayInfo();
  dataToBePostedAfternoon: DayInfo = new DayInfo();

  updateMorningDate() {
    this.dataToBePostedMorning.Day = this.inputedDate.getDate();
    this.dataToBePostedMorning.DayOfWeek = this.inputedDate.getDay();
    this.dataToBePostedMorning.Month = (this.inputedDate.getMonth() + 1);
    this.dataToBePostedMorning.Year = this.inputedDate.getFullYear();
  }

  updateAfternoonDate() {
    this.dataToBePostedAfternoon.Day = this.inputedDate.getDate();
    this.dataToBePostedAfternoon.DayOfWeek = this.inputedDate.getDay();
    this.dataToBePostedAfternoon.Month = (this.inputedDate.getMonth() + 1);
    this.dataToBePostedAfternoon.Year = this.inputedDate.getFullYear();
    this.dataToBePostedAfternoon.AddAfternoonTime = this.showNewTimeRange;
  }

  updateMorningTime() {
    this.dataToBePostedMorning.TimeOfStart = this.timeOfStart;
    this.dataToBePostedMorning.TimeOfFinish = this.timeOfFinish;
  }

  updateAfternooonTime() {
    this.dataToBePostedAfternoon.TimeOfStart = this.timeOfStart;
    this.dataToBePostedAfternoon.TimeOfFinish = this.timeOfFinish;
    this.dataToBePostedAfternoon.TimeOfStart2 = this.timeOfStart2;
    this.dataToBePostedAfternoon.TimeOfFinish2 = this.timeOfFinish2;
  }

  onStartedChecked() {
    if (this.notStartedTodayInput) {
      this.timeOfStartHolder = this.timeOfStart;
      this.timeOfStart = 0;
    }
    else if ((!(this.notStartedTodayInput)) && (this.timeOfStartHolder !== null)) {
      this.timeOfStart = this.timeOfStartHolder;
    }
  }

  onFinishedChecked() {
    if (this.notFinishedTodayInput) {
      this.timeOfFinishHolder = this.timeOfFinish;
      this.timeOfFinish = 1440;
    }
    else if ((!(this.notFinishedTodayInput)) && (this.timeOfFinishHolder !== null)) {
      this.timeOfFinish = this.timeOfFinishHolder;
    }
  }

  onFinishedChecked2() {
    if (this.notFinishedTodayInput2) {
      this.timeOfFinishHolder2 = this.timeOfFinish2;
      this.timeOfFinish2 = 1440;
    }
    else if ((!(this.notFinishedTodayInput)) && (this.timeOfFinishHolder !== null)) {
      this.timeOfFinish2 = this.timeOfFinishHolder2;
    }
  }

  saveTime(timeHolder: { timeOfStart: { hour: number, minute: number }, timeOfFinish: { hour: number, minute: number } }) {
    this.timeOfStart = this.toMinutesOnly(timeHolder.timeOfStart);
    if ((timeHolder.timeOfFinish.minute == 0) && (timeHolder.timeOfFinish.hour == 0)) {
      this.timeOfFinish = 1440;
    }
    else {
      this.timeOfFinish = this.toMinutesOnly(timeHolder.timeOfFinish);
    }
    if (this.notFinishedTodayInput) {
      this.timeOfFinish = 1440;
    }
    else if (this.notStartedTodayInput) {
      this.timeOfStart = 0;
    }
    if (!this.showNewTimeRange) {
      this.updateMorningDate();
      this.updateMorningTime();
      this.dataToBePostedMorning.AddAfternoonTime = this.showNewTimeRange;
      this.dataToBePostedAfternoonSubject.next(this.dataToBePostedMorning);
    }
  }

  saveTime2(timeHolder: { timeOfStart: { hour: number, minute: number }, timeOfFinish: { hour: number, minute: number } }) {
    this.isDayWorkedTimeCorrect2 = true;
    this.timeOfStart2 = this.toMinutesOnly(timeHolder.timeOfStart);
    if ((timeHolder.timeOfFinish.minute == 0) && (timeHolder.timeOfFinish.hour == 0)) {
      this.timeOfFinish2 = 1440;
    }
    else {
      this.timeOfFinish2 = this.toMinutesOnly(timeHolder.timeOfFinish);
    }
    if (this.notFinishedTodayInput2) {
      this.timeOfFinish2 = 1440;
    }
    if (this.showNewTimeRange) {
      this.updateAfternooonTime();
      this.updateAfternoonDate();
      this.dataToBePostedAfternoon.AddAfternoonTime = this.showNewTimeRange;
      this.dataToBePostedAfternoonSubject.next(this.dataToBePostedAfternoon);
    }
  }

  saveDate(dateHolder: Date) {
    this.inputedDate = dateHolder;
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

  getDayWorkedTime() {
    if ((this.timeOfFinish - this.timeOfStart) < 0) {
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
  }

  getDayWorkedTime2() {
    if ((this.timeOfStart > this.timeOfStart2) || (this.timeOfStart2 < this.timeOfFinish) || ((this.timeOfFinish2 - this.timeOfStart2) < 0)) {
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
  }

}
