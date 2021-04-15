import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { DayInfo } from '../../../Models/DayInfo';
import { DataService } from '../shared/data/data.service';
import { AuthService } from '../authentication/authentication-service';
import { User } from 'Models/user.model';
import { PostData } from 'Models/PostData';
import { PublicConstants } from '../shared/public.constants';
import { SecretConstants } from '../shared/secret.constants';

@Component({
  selector: 'app-input-date-and-time',
  templateUrl: './input-date-and-time.component.html',
  styleUrls: ['./input-date-and-time.component.css']
})
export class InputDateAndTimeComponent implements OnDestroy, OnInit {
  constructor(private http: HttpClient, private dataService: DataService, private authService: AuthService, private publicConstants: PublicConstants, private secretConstants: SecretConstants) { }

  newDayInfoSubject: Subject<DayInfo> = new Subject<DayInfo>();

  newDayInfoSubscription: Subscription = this.newDayInfoSubject.subscribe(data => {
    if (this.showNewTimeRange) {
      this.dataService.newDayInputEmmiter.next(this.newDayInfo);
    }
    else {
      this.newDayInfo.TimeOfStart2 = this.publicConstants.defaultValueForTime;
      this.newDayInfo.TimeOfFinish2 = this.publicConstants.defaultValueForTime;
      this.dataService.newDayInputEmmiter.next(this.newDayInfo);
    }
  })

  newDayInfo: DayInfo = new DayInfo();

  user: User = new User();

  inputedDate: Date = new Date();

  timeOfStartHolder: number = 0;
  timeOfFinishHolder: number = 0;

  notStartedTodayInput: boolean = false;
  notFinishedTodayInput: boolean = false;

  notFinishedTodayInput2: boolean = false;
  isDayWorkedTimeCorrect2: boolean = true;

  timeOfStartHolder2: number = this.publicConstants.defaultValueForTime;
  timeOfFinishHolder2: number = this.publicConstants.defaultValueForTime;

  timeOfStartHolder2ForTimePicker = { hour: this.publicConstants.defaultValueForTime, minute: this.publicConstants.defaultValueForTime };
  timeOfFinishHolder2ForTimePicker = { hour: this.publicConstants.defaultValueForTime, minute: this.publicConstants.defaultValueForTime };

  showNewTimeRange: boolean = false;
  showNewTimeRangeButton: boolean = true;

  ngOnInit() {
    this.newDayInfo = this.getNewDayInfo();
    this.dataService.setTodayDate();
    this.user = this.authService.user;
  }

  ngOnDestroy() {
    this.newDayInfoSubscription.unsubscribe();
  }

  setToday() {
    this.dataService.setTodayDate();
  }

  getNewDayInfo(): DayInfo {
    return this.dataService.getNewDayInfo()
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
      this.newDayInfo.TimeOfStart2 = this.publicConstants.defaultValueForTime;
      this.newDayInfo.TimeOfFinish2 = this.publicConstants.defaultValueForTime;
      this.newDayInfo.AddAfternoonTime = false;
      this.newDayInfoSubject.next(this.newDayInfo);
    }
  }

  saveTime2(timeHolder: { timeOfStart: { hour: number, minute: number }, timeOfFinish: { hour: number, minute: number } }) {
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

  postNewDay() {
    if ((this.newDayInfo.TimeOfStart > this.newDayInfo.TimeOfStart2) || (this.newDayInfo.TimeOfStart2 < this.newDayInfo.TimeOfFinish) || ((this.newDayInfo.TimeOfFinish2 - this.newDayInfo.TimeOfStart2) < 0)) {
      console.log(this.publicConstants.wrongDataEnteredError)
    }
    else {
      let postData: PostData = new PostData(this.newDayInfo, this.user.email, this.user.id, this.user.token);
      this.http.post(this.secretConstants.pathToDaysApi, postData).subscribe();
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
    if (this.timeOfStartHolder2 != this.publicConstants.defaultValueForTime) {
      this.timeOfStartHolder2ForTimePicker = this.toNormalTime(this.timeOfStartHolder2);
    }
    if (this.timeOfFinishHolder2 != this.publicConstants.defaultValueForTime) {
      this.timeOfFinishHolder2ForTimePicker = this.toNormalTime(this.timeOfFinishHolder2);
    }

  }

}
