import { Component, OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { DayInfo } from '../../../Models/DayInfo';
import { FetchedData, FetchingDataService } from '../shared/fetchingData.service';

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
  firstFetch: boolean = true;
  fetchingObs = new Subscription();
  dayInfo: DayInfo = new DayInfo();
  dayInfoFetchedDataArray: Array<FetchedData> = new Array<FetchedData>();

  dayInfoArray = new Array<DayInfo>();

  dayInfoArrayToShow = new Array<DayInfo>();

  constructor(private fetchingDataService: FetchingDataService) { }

  dayRequired: string = '';

  ngOnInit(): void {
    this.fetchingObs = this.fetchingDataService.dayInfoArraySub.subscribe(resData => {
      this.dayInfoFetchedDataArray = resData;

      // I want to specify lenght of the array in here, to avoid outOfScope error. I think it will be improved in the future.
      this.dayInfoFetchedDataArray.forEach(() => {
        this.dayInfoArray.push(this.dayInfo);
      });

      this.dayInfoArray = this.fetchingDataService.convertFetchedDataArrayToDayInfoArray(this.dayInfoFetchedDataArray);

      //remember to fix c# backend to add additional 0 for one-digit days
      this.dayInfoArray.sort((n1, n2) => {
        if (n1.DocId < n2.DocId) {
          return 1;
        }

        if (n1.DocId > n2.DocId) {
          return -1;
        }
        return 0;
      });
      this.dayInfoArrayToShow = this.dayInfoArray;
      if (this.firstFetch) {
        this.showWeekBackOnly();
        this.firstFetch = false;
      }
    })
    this.getCollectionOfDays();
  }

  getCollectionOfDays() {
    this.fetchingDataService.getFetchedDataArrayFromCollection("users/pablo/savedDays");
  }

  ngOnDestroy() {
    //GENERATES AN ERROR WHILE LEAVING THE COMPONENT AND THEN COMING BACK TO IT
    this.fetchingObs.unsubscribe();
  }

  showWeekBackOnly() {
    this.dayInfoArrayToShow = this.dayInfoArray;
    if (this.dayInfoArrayToShow.length > 7){
      this.dayInfoArrayToShow = this.dayInfoArray.slice(0, 7);
    }
  }

  showMonthBackOnly() {
    this.dayInfoArrayToShow = this.dayInfoArray;
    if (this.dayInfoArrayToShow.length > 28){
      this.dayInfoArrayToShow = this.dayInfoArray.slice(0, 28);
    }
  }

  showEverything() {
    this.dayInfoArrayToShow = this.dayInfoArray;
  }
}
