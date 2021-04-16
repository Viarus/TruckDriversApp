import { Component, OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { DayInfo } from '../../../Models/DayInfo';
import { DeletingDataService } from '../shared/deletingData.service';
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

  isLoading = false;

  refreshButtonDisabled = false;

  dayInfoArray: Array<DayInfo>;
  dayInfoArrayToShow: Array<DayInfo>;

  dayInfoArraySubscription: Subscription = new Subscription();
  isLoadingSubscription: Subscription = new Subscription();

  constructor(private fetchingDataService: FetchingDataService, private deleteData: DeletingDataService) { }

  ngOnInit() {
    this.isLoadingSubscription = this.fetchingDataService.isLoadingSub.subscribe(resData => {
      this.isLoading = resData;
      console.log(this.isLoading);
    });
    this.dayInfoArraySubscription = this.fetchingDataService.dayInfoSub.subscribe(resData => {
      this.dayInfoArray = resData;
      this.dayInfoArrayToShow = resData;
      this.showMonthBackOnly();
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
  disableButton(){
    this.refreshButtonDisabled = true;
    setTimeout(() => {
      this.refreshButtonDisabled = false}, 3500);
  }
  onDelete(index: number){
    this.deleteData.onDelete(this.dayInfoArray[index].DocId);    
  }
}
