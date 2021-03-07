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

  EnterDataMenuClick() {
    this.isEnterDataMenuActive = true;
    this.isShowAllDaysMenuActive = false;
  }
  ShowAllDaysMenuClick() {
    this.isEnterDataMenuActive = false;
    this.isShowAllDaysMenuActive = true;
  }

  SaveAllData({ TimeOfStart, TimeOfFinish, TimeOfStart2, TimeOfFinish2, DayOfWeek, Day, Month, Year, AddAfternoonTime }) {
    this.dayInfo.TimeOfStart = TimeOfStart;
    this.dayInfo.TimeOfFinish = TimeOfFinish;
    this.dayInfo.TimeOfStart2 = TimeOfStart2;
    this.dayInfo.TimeOfFinish2 = TimeOfFinish2;
    this.dayInfo.Day = Day;
    this.dayInfo.Month = Month;
    this.dayInfo.Year = Year;
    this.dayInfo.AddAfternoonTime = AddAfternoonTime;
    this.dayInfo.DayOfWeek = DayOfWeek;
  }
}
