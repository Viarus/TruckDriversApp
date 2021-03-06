import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DayInfo } from "src/app/shared/models/dayInfo.model";
import { User } from "src/app/shared/models/user.model";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { AuthService } from "./authentication-service";
import { SecretConstants } from "../constants/secret.constants";

@Injectable({ providedIn: 'root' })
export class FetchingDataService {
    constructor(private http: HttpClient, private authService: AuthService, private secretConstants: SecretConstants) { }

    user: User = new User();

    public isRefreshed = false;

    isLoadingSub: Subject<boolean> = new Subject<boolean>();

    dayInfoSub = new Subject<Array<DayInfo>>();
    dayInfoToShowSub = new Subject<Array<DayInfo>>();

    dayInfoArray = new Array<DayInfo>();

    getUserSavedDays() {
        //make the same validation for backend
        if (this.isRefreshed || (this.dayInfoArray.length == 0)) {
            this.user = this.authService.user;
            const headerDict = {
                'token': this.user.token,
            }

            const requestOptions = {
                headers: new HttpHeaders(headerDict),
            };
            this.isLoadingSub.next(true);
            this.http.get<Array<object>>(this.secretConstants.pathToDaysApi, requestOptions).pipe(take(1)).subscribe(response => {
                let dayInfoArrayHolder = new Array<DayInfo>();
                response.forEach(element => {
                    let dayInfo = new DayInfo();
                    dayInfo.DocId = element['docId'];
                    dayInfo.TimeOfStart = element['timeOfStart'];
                    dayInfo.TimeOfStart2 = element['timeOfStart2'];
                    dayInfo.TimeOfFinish = element['timeOfFinish'];
                    dayInfo.TimeOfFinish2 = element['timeOfFinish2'];
                    dayInfo.Day = element['day'];
                    dayInfo.DayOfWeek = element['dayOfWeek'];
                    dayInfo.Month = element['month'];
                    dayInfo.Year = element['year'];
                    dayInfo.AddAfternoonTime = element['addAfternoonTime'];
                    dayInfoArrayHolder.push(dayInfo);
                });
                this.dayInfoArray = dayInfoArrayHolder;
                this.dayInfoSub.next(this.dayInfoArray);
            });
        }
        this.isLoadingSub.next(false);
        this.isRefreshed = false;
    }
}