import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DayInfo } from '../../Models/DayInfo';
import { AuthService } from './authentication/authentication-service';


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
      console.log('Show me that you love me');
      if (user.email == "guestAccount") {
        this.showGuestInfoBox = true;
      }
    })
    if (this.authService.user.email == "guestAccount"){
      this.showGuestInfoBox = true;
      console.log('Show me that you love me NO SUB');
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
