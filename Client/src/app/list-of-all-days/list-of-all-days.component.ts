import { Component, OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { DayInfo } from '../../../Models/DayInfo';
import { DeletingDataService } from '../shared/deletingData.service';
import { FetchingDataService } from '../shared/fetchingData.service';
import { ClockTime } from '../../../Models/ClockTime'

@Injectable()
export class ConfigService {
  constructor() { }
}
@Component({
  selector: 'app-list-of-all-days',
  templateUrl: './list-of-all-days.component.html',
  styleUrls: ['./list-of-all-days.component.css']
})

export class ListOfAllDaysComponent implements OnInit, OnDestroy {

  isZeroDays: boolean = false;

  isLoading = false;

  refreshButtonDisabled = false;

  dayInfo = new DayInfo();
  dayInfoArray: Array<DayInfo>;
  dayInfoArrayToShow: Array<DayInfo>;

  dayInfoArraySubscription: Subscription = new Subscription();
  isLoadingSubscription: Subscription = new Subscription();

  constructor(private fetchingDataService: FetchingDataService, private deleteData: DeletingDataService) { }

  ngOnInit() {
    let clockTime: ClockTime = new ClockTime();
    this.isLoadingSubscription = this.fetchingDataService.isLoadingSub.subscribe(resData => {
      this.isLoading = resData;
      console.log(this.isLoading);
    });
    this.dayInfoArraySubscription = this.fetchingDataService.dayInfoSub.subscribe(resData => {
      this.dayInfoArray = resData;
      this.dayInfoArray.forEach(element => {
        element.TimeOfStartClockLike = clockTime.showClockLikeFromMinutesOnly(element.TimeOfStart);
        element.TimeOfFinishClockLike = clockTime.showClockLikeFromMinutesOnly(element.TimeOfFinish);
        if (element.TimeOfStart2 == 2000) {
          element.TimeOfStart2ClockLike = "";
        }
        else {
          element.TimeOfStart2ClockLike = clockTime.showClockLikeFromMinutesOnly(element.TimeOfStart2);
        }
        if (element.TimeOfFinish2 == 2000) {
          element.TimeOfFinish2ClockLike = "";
        }
        else {
          element.TimeOfFinish2ClockLike = clockTime.showClockLikeFromMinutesOnly(element.TimeOfFinish2);
        }
        element.DayOfWeekString = this.dayInfo.getDayOfWeek(element.DayOfWeek);
      });
      this.dayInfoArrayToShow = this.dayInfoArray;
      this.showMonthBackOnly();
      console.log(this.dayInfoArray);
      if (typeof this.dayInfoArray == 'undefined') {
        this.isZeroDays = true;
      }
      else if (this.dayInfoArray.length == 0){
        this.isZeroDays = true;
      }
      else {
        this.isZeroDays = false;
      }
    },
      error => {
        console.log(error);
        this.isLoading = false;
      });
    if (this.fetchingDataService.dayInfoArray.length == 0) {
      this.fetchingDataService.getUserSavedDays();
    }
    else {
      this.dayInfoArray = this.fetchingDataService.dayInfoArray;
      this.dayInfoArrayToShow = this.fetchingDataService.dayInfoArray;
      this.showMonthBackOnly();
    }
  }
  ngOnDestroy() {
    this.dayInfoArraySubscription.unsubscribe();
    this.isLoadingSubscription.unsubscribe();
  }

  showWeekBackOnly() {
    this.dayInfoArrayToShow = this.dayInfoArray;
    if (this.dayInfoArrayToShow.length > 7) {
      this.dayInfoArrayToShow = this.dayInfoArray.slice(0, 7);
    }
  }

  showMonthBackOnly() {
    this.dayInfoArrayToShow = this.dayInfoArray;
    if (this.dayInfoArrayToShow.length > 28) {
      this.dayInfoArrayToShow = this.dayInfoArray.slice(0, 28);
    }
  }

  onRefresh() {
    this.fetchingDataService.isRefreshed = true;
    this.fetchingDataService.getUserSavedDays();
    this.disableButton();
  }
  disableButton() {
    this.refreshButtonDisabled = true;
    setTimeout(() => {
      this.refreshButtonDisabled = false
    }, 3500);
  }
  onDelete(index: number) {
    this.deleteData.onDelete(this.dayInfoArray[index].DocId);
  }
}
