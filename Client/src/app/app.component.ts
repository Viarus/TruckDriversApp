import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DayInfo } from '../../Models/DayInfo';
import { AuthService } from './authentication/authentication-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private translateService: TranslateService) { 
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
   };
  ngOnInit() {
    this.authService.autoLogin();
  }
  title = '';
  dayInfo: DayInfo = new DayInfo();

  isEnterDataMenuActive: boolean = true;
  isShowAllDaysMenuActive: boolean = false;
  isLoginMenuActive: boolean = false;


}
