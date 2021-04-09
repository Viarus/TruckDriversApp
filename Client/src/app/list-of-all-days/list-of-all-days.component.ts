import { Component, OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { User } from 'Models/user.model';
import { Subscription } from 'rxjs';
import { DayInfo } from '../../../Models/DayInfo';
import { AuthService } from '../authentication/authentication-service';
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
  user: User = new User();
  firstFetch: boolean = true;
  fetchingObs = new Subscription();
  dayInfo: DayInfo = new DayInfo();
  dayInfoFetchedDataArray: Array<FetchedData> = new Array<FetchedData>();

  dayInfoArray = new Array<DayInfo>();

  dayInfoArrayToShow = new Array<DayInfo>();

  constructor(private fetchingDataService: FetchingDataService, private authService: AuthService) { }

  dayRequired: string = '';

  ngOnInit(): void {
    //persistance storage to do
    // or create a button - otherwise you will have milion reads if someone will refresh the page few times
    this.user = this.authService.user;
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
    if (!(this.user.email == 'notValid')) {
      this.fetchingDataService.getFetchedDataArrayFromCollection(`users/${this.user.id}/savedDays`);
    }
    else {
      console.log("no User logged in");
    }
  }

  ngOnDestroy() {
    this.fetchingObs.unsubscribe();
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

  showEverything() {
    // SORRY - TOO MANY READS
  }
}
