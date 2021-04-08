import { Component, OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { DayInfo } from '../../../Models/DayInfo';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
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
  username: string = "pablo";
  dayInfo: DayInfo = new DayInfo();
  dayInfoArray = new Array<DayInfo>();
  dayInfoDoc: DocumentData;
  anyData: any;
  dayInfoFetchedDataArray: Array<FetchedData> = new Array<FetchedData>();

  constructor(private db: AngularFirestore, private user: AuthService, private fetchingDataService: FetchingDataService) { }

  token: string = null;

  dayRequired: string = '2021-4-15';

  ngOnInit(): void {
    this.fetchingDataService.dayInfoArraySub.subscribe(resData => {
      this.dayInfoFetchedDataArray = resData;

      // I want to specify lenght of the array in here, to avoid outOfScope error. I think it will be improved in the future.
      this.dayInfoFetchedDataArray.forEach(element => {
        this.dayInfoArray.push(this.dayInfo);
      });

      this.dayInfoArray = this.fetchingDataService.convertFetchedDataArrayToDayInfoArray(this.dayInfoFetchedDataArray);
      console.log('from component:');
      console.log(this.dayInfoArray);
    })
  }

  getCollectionOfDays() {
    this.fetchingDataService.getFetchedDataArrayFromCollection("users/pablo/savedDays");
  }

  ngOnDestroy() {
    this.fetchingDataService.dayInfoArraySub.unsubscribe();
  }
}
