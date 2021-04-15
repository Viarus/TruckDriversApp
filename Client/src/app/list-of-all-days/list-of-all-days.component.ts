import { Component, OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DayInfo } from '../../../Models/DayInfo';
import { FetchingDataService } from '../shared/fetchingData.service';

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

  dayInfoArray: Array<DayInfo>;
  dayInfoArrayToShow: Array<DayInfo>;

  dayInfoArraySubscribtion: Subscription = new Subscription();

  constructor(private fetchingDataService: FetchingDataService) { }

  ngOnInit() {
    if (this.fetchingDataService.dayInfoArray.length == 0) {
      this.dayInfoArraySubscribtion = this.fetchingDataService.dayInfoSub.subscribe(resData => {
        this.dayInfoArray = resData;
        this.dayInfoArrayToShow = resData;
        this.showMonthBackOnly();
      });
      this.fetchingDataService.getUserSavedDays();
    }
    else {
      this.dayInfoArray = this.fetchingDataService.dayInfoArray;
      this.dayInfoArrayToShow = this.fetchingDataService.dayInfoArray;
      this.showMonthBackOnly();
    }

  }
  ngOnDestroy() {
    this.dayInfoArraySubscribtion.unsubscribe();
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
    this.fetchingDataService.isRefreshed = false;
  }
}
