import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {DayInfo} from './shared/models/dayInfo.model';
import {AuthService} from './shared/services/authentication-service';
import {PublicConstants} from './shared/constants/public.constants';
import {dataService} from './shared/data/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  userSubs = new Subscription();
  showGuestInfoBox = false;


  title = '';
  dayInfo: DayInfo = dataService.newDayInfo;

  isEnterDataMenuActive = true;
  isShowAllDaysMenuActive = false;
  isLoginMenuActive = false;

  ngOnInit() {
    this.authService.autoLogin();
    this.userSubs = this.authService.userSub.subscribe(resData => {
      const user = resData;
      if (user.email == PublicConstants.GUEST_ACCOUNT_EMAIL) {
        this.showGuestInfoBox = true;
      }
    });
    if (this.authService.user.email == PublicConstants.GUEST_ACCOUNT_EMAIL) {
      this.showGuestInfoBox = true;
    }

  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  marginTopIfNotGuestAccount(): string {
    if (this.showGuestInfoBox) {
      return '0px';
    } else {
      return '30px';
    }
  }

  onCloseAlert() {
    this.showGuestInfoBox = false;
  }


}
