import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DayInfo } from "src/app/shared/models/dayInfo.model";
import { PostData } from "src/app/shared/models/postData.model";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./authentication-service";
import { PublicConstants } from "../constants/public.constants";
import { SecretConstants } from "../constants/secret.constants";

@Injectable({ providedIn: 'root' })
export class PostingDataService {

    constructor(private http: HttpClient, private authService: AuthService, private secretConstants: SecretConstants, private toastrService: ToastrService, private publicConstants: PublicConstants) { }

    onPost(newDayInfo: DayInfo) {

        if (this.isDayInfoValid(newDayInfo)) {
            let postData: PostData = new PostData(newDayInfo, this.authService.user.email, this.authService.user.id, this.authService.user.token);
            this.http.post(this.secretConstants.pathToDaysApi, postData).subscribe(resData => {
                this.toastrService.success(this.publicConstants.savingSuccess);
            });
        }
        else {
            this.toastrService.error(this.publicConstants.wrongDataEnteredError);
        }
    }
    isDayInfoValid(dayInfo: DayInfo): boolean {
        if ((dayInfo.TimeOfStart >= dayInfo.TimeOfFinish)
            || (dayInfo.TimeOfStart >= dayInfo.TimeOfStart2)
            || (dayInfo.TimeOfFinish >= dayInfo.TimeOfStart2)
            || ((dayInfo.TimeOfStart2 >= dayInfo.TimeOfFinish2)
                && ((dayInfo.TimeOfStart2 !== PublicConstants.DEFAULT_VALUE_FOR_TIME)
                    || (dayInfo.TimeOfFinish2 !== PublicConstants.DEFAULT_VALUE_FOR_TIME)))
            || (dayInfo.TimeOfStart < 0)
            || (dayInfo.TimeOfStart >= 1440)
            || (dayInfo.TimeOfStart2 < 0)
            || (dayInfo.TimeOfFinish < 0)
            || (dayInfo.TimeOfFinish > 1440)
            || (dayInfo.TimeOfFinish2 < 0)) {
            return false;
        }
        else if (((dayInfo.TimeOfFinish2 > 1440) && (dayInfo.TimeOfFinish2 !== PublicConstants.DEFAULT_VALUE_FOR_TIME))
            || ((dayInfo.TimeOfStart2 >= 1440) && (dayInfo.TimeOfStart2 !== PublicConstants.DEFAULT_VALUE_FOR_TIME))) {
            return false;
        }
        else {
            return true;
        }
    }
}