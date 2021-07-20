import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DayInfo } from '../shared/models/dayInfo.model';
import { DataService } from '../shared/data/data.service';
import { AuthService } from '../shared/services/authentication-service';
import { PublicConstants } from '../shared/constants/public.constants';
import { ToastrService } from 'ngx-toastr';
import { PostingDataService } from '../shared/services/postingData.service';
import { ClockTime } from '../shared/models/clockTime.model';

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

  clockTimeService: ClockTime = new ClockTime();

  inputedDate: Date = new Date();

  timeOfStartHolder: number = 0;
  timeOfFinishHolder: number = 0;

  notStartedTodayInput: boolean = false;
  notFinishedTodayInput: boolean = false;

  notFinishedTodayInput2: boolean = false;
  isDayWorkedTimeCorrect2: boolean = true;

  timeOfStartHolder2: number = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
  timeOfFinishHolder2: number = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;

  timeOfStartHolder2ForTimePicker = new ClockTime(PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE, PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE)
  timeOfFinishHolder2ForTimePicker = new ClockTime(PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE, PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE)

  showNewTimeRange: boolean = false;
  showNewTimeRangeButton: boolean = true;

  ngOnInit() {
    this.newDayInfo = this.dataService.getNewDayInfo();
    this.dataService.setTodayDate();
  }

  ngOnDestroy() {
    this.newDayInfoSubscription.unsubscribe();
  }

  //this is needed - html can't read it from the data.service class
  setToday() { 
    this.dataService.setTodayDate();
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

  saveTime(timeHolder: { timeOfStart: ClockTime, timeOfFinish: ClockTime }) {
    this.newDayInfo.TimeOfStart = this.clockTimeService.toMinutesOnly(timeHolder.timeOfStart);
    if ((timeHolder.timeOfFinish.minutes == 0) && (timeHolder.timeOfFinish.hours == 0)) {
      this.newDayInfo.TimeOfFinish = 1440;
    }
    else {
      this.newDayInfo.TimeOfFinish = this.clockTimeService.toMinutesOnly(timeHolder.timeOfFinish);
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

  saveTime2(timeHolder: { timeOfStart: ClockTime, timeOfFinish: ClockTime }) {
    this.newDayInfo.TimeOfStart2 = this.clockTimeService.toMinutesOnly(timeHolder.timeOfStart);
    if ((timeHolder.timeOfFinish.minutes == 0) && (timeHolder.timeOfFinish.hours == 0)) {
      this.newDayInfo.TimeOfFinish2 = 1440;
    }
    else {
      this.newDayInfo.TimeOfFinish2 = this.clockTimeService.toMinutesOnly(timeHolder.timeOfFinish);
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
      this.timeOfStartHolder2ForTimePicker = this.clockTimeService.toClockTime(this.timeOfStartHolder2);
    }
    if (this.timeOfFinishHolder2 != PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE) {
      this.timeOfFinishHolder2ForTimePicker = this.clockTimeService.toClockTime(this.timeOfFinishHolder2);
    }

  }

}
