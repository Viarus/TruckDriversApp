import {Component, OnDestroy, OnInit} from '@angular/core';
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

  newDayInfo: DayInfo = dataService.newDayInfo;

  notStartedTodayInput = dataService.isNotTodayStartedChecked;
  notFinishedTodayInput = dataService.isNotTodayFinishedChecked;
  notFinishedTodayInput2 = dataService.isNotTodayFinishedChecked2;

  isDayWorkedTimeCorrect2 = true;

  timeOfStartHolder = PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE;
  timeOfFinishHolder = PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE;

  timeOfStartHolder2: number = PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE;
  timeOfFinishHolder2: number = PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE;

  showNewTimeRange = false;
  showNewTimeRangeButton = true;

  ngOnInit(): void {
    dataService.newDayInputEmitter.subscribe(data => {
      this.newDayInfo = data;
    });
    dataService.setTodayDate();
  }

  ngOnDestroy(): void {
    dataService.newDayInputEmitter.unsubscribe();
  }

  // this is needed - html can't read it from the data.service class
  setToday(): void {
    dataService.setTodayDate();
  }

  onStartedChecked(): void {
    if (this.notStartedTodayInput) {
      this.timeOfStartHolder = dataService.newDayInfo.TimeOfStart;
      dataService.newDayInfo.TimeOfStart = 0;
      dataService.isNotTodayStartedChecked = true;
    } else if ((!(this.notStartedTodayInput)) && (this.timeOfStartHolder !== PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE)) {
      dataService.newDayInfo.TimeOfStart = this.timeOfStartHolder;
      dataService.isNotTodayStartedChecked = false;
    }
  }

  onFinishedChecked(): void {
    if (this.notFinishedTodayInput) {
      this.timeOfFinishHolder = dataService.newDayInfo.TimeOfFinish;
      dataService.newDayInfo.TimeOfFinish = 1440;
      dataService.isNotTodayFinishedChecked = true;
    } else if ((!(this.notFinishedTodayInput)) && (this.timeOfFinishHolder !== PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE)) {
      dataService.newDayInfo.TimeOfFinish = this.timeOfFinishHolder;
      dataService.isNotTodayFinishedChecked = false;
    }
  }


  onFinishedChecked2(): void {
    if (this.notFinishedTodayInput2) {
      this.timeOfFinishHolder2 = dataService.newDayInfo.TimeOfFinish2;
      dataService.newDayInfo.TimeOfFinish2 = 1440;
      dataService.isNotTodayFinishedChecked2 = true;
    } else if ((!(this.notFinishedTodayInput)) && (this.timeOfFinishHolder !== PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE)) {
      dataService.newDayInfo.TimeOfFinish2 = this.timeOfFinishHolder2;
      dataService.isNotTodayFinishedChecked2 = false;
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
      this.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE;
      this.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE;
      this.newDayInfo.AddAfternoonTime = false;
      // this.newDayInfoSubject.next(this.newDayInfo);
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
      // this.newDayInfoSubject.next(this.newDayInfo);
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
      if (!dataService.newDayInfo.AddAfternoonTime) {
        dataService.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE;
        dataService.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE;
      }
      this.postingDataService.onPost(this.newDayInfo);
    } else {
      this.toastrService.error(this.publicConstants.needForLogIn);
    }
  }

  onShowNewTimeRange(): void {
    this.showNewTimeRange = true;
    dataService.newDayInfo.AddAfternoonTime = true;
    this.showNewTimeRangeButton = false;
    if (this.timeOfStartHolder2 !== PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE) {
      dataService.newDayInfo.TimeOfStart2 = this.timeOfStartHolder2;
    }
    if (this.timeOfFinishHolder2 !== PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE) {
      dataService.newDayInfo.TimeOfFinish2 = this.timeOfFinishHolder2;
    }
  }

  onHideNewTimeRange(): void {
    this.showNewTimeRange = false;
    dataService.newDayInfo.AddAfternoonTime = false;
    this.showNewTimeRangeButton = true;
    this.timeOfStartHolder2 = dataService.newDayInfo.TimeOfStart2;
    this.timeOfFinishHolder2 = dataService.newDayInfo.TimeOfFinish2;
    dataService.newDayInfo.TimeOfStart2 = PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE;
    dataService.newDayInfo.TimeOfFinish2 = PublicConstants.DEFAULT_BLANK_VALUE_FOR_TIME_AND_DATE;
  }

}
