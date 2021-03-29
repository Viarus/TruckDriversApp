import { Component } from '@angular/core';
import { DayInfo } from '../../Models/DayInfo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = '';
  dayInfo: DayInfo = new DayInfo();

  isEnterDataMenuActive: boolean = true;
  isShowAllDaysMenuActive: boolean = false;
  isLoginMenuActive: boolean = false;
}
