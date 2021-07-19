import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DayInfo } from './shared/models/dayInfo.model';
import { AuthService } from './shared/services/authentication-service';
import { PublicConstants } from './shared/constants/public.constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private translateService: TranslateService) { 
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
   };

   userSubs = new Subscription();
   showGuestInfoBox: boolean = false;

  ngOnInit() {
    this.authService.autoLogin();
    this.userSubs = this.authService.userSub.subscribe(resData => {
      let user = resData;
      if (user.email == PublicConstants.GUEST_ACCOUNT_EMAIL) {
        this.showGuestInfoBox = true;
      }
    })
    if (this.authService.user.email == PublicConstants.GUEST_ACCOUNT_EMAIL){
      this.showGuestInfoBox = true;
    };
  }
  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }


  title = '';
  dayInfo: DayInfo = new DayInfo();

  isEnterDataMenuActive: boolean = true;
  isShowAllDaysMenuActive: boolean = false;
  isLoginMenuActive: boolean = false;

  marginTopIfNotGuestAccount(): string {
    if (this.showGuestInfoBox) {
      return "0px";
    }
    else {
      return "30px";
    }
  }

  onCloseAlert(){
    this.showGuestInfoBox = false;
  }


}
