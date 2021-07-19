import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DayInfo } from '../shared/models/dayInfo.model';
import { DataService } from '../shared/data/data.service';
import { AuthService } from '../shared/services/authentication-service';
import { PublicConstants } from '../shared/constants/public.constants';
import { ToastrService } from 'ngx-toastr';
import { PostingDataService } from '../shared/services/postingData.service';

@Component({
  selector: 'app-input-date-and-time',
  templateUrl: './input-date-and-time.component.html',
  styleUrls: ['./input-date-and-time.component.css']
})
export class InputDateAndTimeComponent implements OnDestroy, OnInit {
  constructor(private dataService: DataService, private publicConstants: PublicConstants, private postingDataService: PostingDataService, private authService: AuthService, private toastrService: ToastrService) { }

  newDayInfoSubject: Subject<DayInfo> = new Subject<DayInfo>();

  newDayInfoSubscription: Subscription = this.newDayInfoSubject.subscribe(data => {
    if (this.showNewTimeRange) {
      this.dataService.newDayInputEmmiter.next(this.newDayInfo);
    }
    else {
      this.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
      this.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
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

  timeOfStartHolder2: number = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
  timeOfFinishHolder2: number = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;

  timeOfStartHolder2ForTimePicker = { hour: PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE, minute: PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE };
  timeOfFinishHolder2ForTimePicker = { hour: PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE, minute: PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE };

  showNewTimeRange: boolean = false;
  showNewTimeRangeButton: boolean = true;

  ngOnInit() {
    this.newDayInfo = this.getNewDayInfo();
    this.dataService.setTodayDate();
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
      this.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
      this.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
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
    if (this.authService.isUserValid(this.authService.user)){
      if (!this.showNewTimeRange){
        this.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
        this.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
      }
      this.postingDataService.onPost(this.newDayInfo);
    }
    else{
      this.toastrService.error(this.publicConstants.needForLogIn);
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
    if (this.timeOfStartHolder2 != PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE) {
      this.timeOfStartHolder2ForTimePicker = this.toNormalTime(this.timeOfStartHolder2);
    }
    if (this.timeOfFinishHolder2 != PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE) {
      this.timeOfFinishHolder2ForTimePicker = this.toNormalTime(this.timeOfFinishHolder2);
    }

  }

}
