import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DayInfo} from 'src/app/shared/models/dayInfo.model';
import {Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {AuthService} from './authentication-service';
import {SecretConstants} from '../constants/secret.constants';
import {FetchHeader} from '../models/request/FetchHeader.model';
import {PublicConstants} from '../constants/public.constants';

@Injectable({providedIn: 'root'})
export class FetchingDataService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public isRefreshed = false;
  isLoadingSub: Subject<boolean> = new Subject<boolean>();
  dayInfoSub = new Subject<Array<DayInfo>>();
  dayInfoToShowSub = new Subject<Array<DayInfo>>();
  dayInfoArray = new Array<DayInfo>();

  getUserSavedDays() {
    //make the same validation for backend
    if (this.isRefreshed || (this.dayInfoArray.length == 0)) {

      let fetchHeader = new FetchHeader(this.authService.user.token);

      const requestOptions = {
        headers: fetchHeader.getHeader(fetchHeader)
      };

      this.isLoadingSub.next(true);

      this.http.get<Array<object>>(SecretConstants.pathToDaysApi, requestOptions).pipe(take(1)).subscribe(response => {
        let dayInfoArrayHolder = this.convertToDayInfoArray(response);
        this.dayInfoSub.next(dayInfoArrayHolder);
      });
    }
    this.isLoadingSub.next(false);
    this.isRefreshed = false;
  }

  private convertToDayInfoArray(response: any): Array<DayInfo> {
    let dayInfoArrayHolder = new Array<DayInfo>();
    response.forEach(element => {
      let dayInfo = new DayInfo();
      dayInfo.DocId = element[PublicConstants.DAY_INFO_PROPERTY_DOC_ID];
      dayInfo.TimeOfStart = element[PublicConstants.DAY_INFO_PROPERTY_TIME_OF_START];
      dayInfo.TimeOfStart2 = element[PublicConstants.DAY_INFO_PROPERTY_TIME_OF_START_2];
      dayInfo.TimeOfFinish = element[PublicConstants.DAY_INFO_PROPERTY_TIME_OF_FINISH];
      dayInfo.TimeOfFinish2 = element[PublicConstants.DAY_INFO_PROPERTY_TIME_OF_FINISH_2];
      dayInfo.Day = element[PublicConstants.DAY_INFO_PROPERTY_DAY];
      dayInfo.DayOfWeek = element[PublicConstants.DAY_INFO_PROPERTY_DAY_OF_WEEK];
      dayInfo.Month = element[PublicConstants.DAY_INFO_PROPERTY_MONTH];
      dayInfo.Year = element[PublicConstants.DAY_INFO_PROPERTY_YEAR];
      dayInfo.AddAfternoonTime = element[PublicConstants.DAY_INFO_PROPERTY_ADD_AFTERNOON_TIME];
      dayInfoArrayHolder.push(dayInfo);
    });
    return dayInfoArrayHolder;
  }
}
