import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {DayInfo} from '../shared/models/dayInfo.model';
import {dataService} from '../shared/data/data.service';
import {AuthService} from '../shared/services/authentication-service';
import {PublicConstants} from '../shared/constants/public.constants';
import {ToastrService} from 'ngx-toastr';
import {PostingDataService} from '../shared/services/postingData.service';
import {ClockTime} from '../shared/models/clockTime.model';

@Component({
  selector: 'app-input-date-and-time',
  templateUrl: './input-date-and-time.component.html',
  styleUrls: ['./input-date-and-time.component.css']
})
export class InputDateAndTimeComponent implements OnDestroy, OnInit {
  constructor(
    private publicConstants: PublicConstants,
    private postingDataService: PostingDataService,
    private authService: AuthService,
    private toastrService: ToastrService) {
  }

  newDayInfoSubject: Subject<DayInfo> = new Subject<DayInfo>();

  newDayInfoSubscription: Subscription = this.newDayInfoSubject.subscribe(data => {
    if (this.showNewTimeRange) {
      dataService.newDayInputEmitter.next(this.newDayInfo);
    } else {
      this.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
      this.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
      dataService.newDayInputEmitter.next(this.newDayInfo);
    }
  });

  newDayInfo: DayInfo = new DayInfo();

  timeOfStartHolder = 0;
  timeOfFinishHolder = 0;

  notStartedTodayInput = false;
  notFinishedTodayInput = false;

  notFinishedTodayInput2 = false;
  isDayWorkedTimeCorrect2 = true;

  timeOfStartHolder2: number = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
  timeOfFinishHolder2: number = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;

  timeOfStartHolder2ForTimePicker = new ClockTime(
    PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE,
    PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE);

  timeOfFinishHolder2ForTimePicker = new ClockTime(
    PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE,
    PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE);

  showNewTimeRange = false;
  showNewTimeRangeButton = true;

  ngOnInit(): void {
    this.newDayInfo = dataService.getNewDayInfo();
    dataService.setTodayDate();
  }

  ngOnDestroy(): void {
    this.newDayInfoSubscription.unsubscribe();
  }

  // this is needed - html can't read it from the data.service class
  setToday(): void {
    dataService.setTodayDate();
  }

  onStartedChecked(): void {
    if (this.notStartedTodayInput) {
      this.timeOfStartHolder = this.newDayInfo.TimeOfStart;
      this.newDayInfo.TimeOfStart = 0;
    } else if ((!(this.notStartedTodayInput)) && (this.timeOfStartHolder !== null)) {
      this.newDayInfo.TimeOfStart = this.timeOfStartHolder;
    }
  }

  onFinishedChecked(): void {
    if (this.notFinishedTodayInput) {
      this.timeOfFinishHolder = this.newDayInfo.TimeOfFinish;
      this.newDayInfo.TimeOfFinish = 1440;
    } else if ((!(this.notFinishedTodayInput)) && (this.timeOfFinishHolder !== null)) {
      this.newDayInfo.TimeOfFinish = this.timeOfFinishHolder;
    }
  }

  onFinishedChecked2(): void {
    if (this.notFinishedTodayInput2) {
      this.timeOfFinishHolder2 = this.newDayInfo.TimeOfFinish2;
      this.newDayInfo.TimeOfFinish2 = 1440;
    } else if ((!(this.notFinishedTodayInput)) && (this.timeOfFinishHolder !== null)) {
      this.newDayInfo.TimeOfFinish2 = this.timeOfFinishHolder2;
    }
  }

  saveTime(timeHolder: { timeOfStart: ClockTime, timeOfFinish: ClockTime }): void {
    this.newDayInfo.TimeOfStart = ClockTime.toMinutesOnly(timeHolder.timeOfStart);
    if ((timeHolder.timeOfFinish.minutes === 0) && (timeHolder.timeOfFinish.hours === 0)) {
      this.newDayInfo.TimeOfFinish = 1440;
    } else {
      this.newDayInfo.TimeOfFinish = ClockTime.toMinutesOnly(timeHolder.timeOfFinish);
    }
    if (this.notFinishedTodayInput) {
      this.newDayInfo.TimeOfFinish = 1440;
    } else if (this.notStartedTodayInput) {
      this.newDayInfo.TimeOfStart = 0;
    }
    if (!this.showNewTimeRange) {
      this.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
      this.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
      this.newDayInfo.AddAfternoonTime = false;
      this.newDayInfoSubject.next(this.newDayInfo);
    }
  }

  saveTime2(timeHolder: { timeOfStart: ClockTime, timeOfFinish: ClockTime }): void {
    this.newDayInfo.TimeOfStart2 = ClockTime.toMinutesOnly(timeHolder.timeOfStart);
    if ((timeHolder.timeOfFinish.minutes === 0) && (timeHolder.timeOfFinish.hours === 0)) {
      this.newDayInfo.TimeOfFinish2 = 1440;
    } else {
      this.newDayInfo.TimeOfFinish2 = ClockTime.toMinutesOnly(timeHolder.timeOfFinish);
    }
    if (this.notFinishedTodayInput2) {
      this.newDayInfo.TimeOfFinish2 = 1440;
    }
    if (this.showNewTimeRange) {
      this.newDayInfo.AddAfternoonTime = true;
      this.newDayInfoSubject.next(this.newDayInfo);
    }
  }

  saveDate(dateHolder: Date): void {
    this.newDayInfo.Day = dateHolder.getDate();
    this.newDayInfo.DayOfWeek = dateHolder.getDay();
    this.newDayInfo.Month = (dateHolder.getMonth() + 1);
    this.newDayInfo.Year = dateHolder.getFullYear();
  }

  postNewDay(): void {
    if (this.authService.isUserValid(this.authService.user)) {
      if (!this.showNewTimeRange) {
        this.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
        this.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
      }
      this.postingDataService.onPost(this.newDayInfo);
    } else {
      this.toastrService.error(this.publicConstants.needForLogIn);
    }
  }

  onShowNewTimeRange(): void {
    this.showNewTimeRange = true;
    this.showNewTimeRangeButton = false;
  }

  onHideNewTimeRange(): void {
    this.showNewTimeRange = false;
    this.showNewTimeRangeButton = true;
    this.timeOfStartHolder2 = this.newDayInfo.TimeOfStart2;
    this.timeOfFinishHolder2 = this.newDayInfo.TimeOfFinish2;
    if (this.timeOfStartHolder2 !== PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE) {
      this.timeOfStartHolder2ForTimePicker = ClockTime.toClockTime(this.timeOfStartHolder2);
    }
    if (this.timeOfFinishHolder2 !== PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE) {
      this.timeOfFinishHolder2ForTimePicker = ClockTime.toClockTime(this.timeOfFinishHolder2);
    }

  }

}
