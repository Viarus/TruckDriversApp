import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  isLoginMode: boolean = true;

  SwitchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm){
    console.log(form.value)
    form.reset();
  }

  EnterDataMenuClick() {
    this.isEnterDataMenuActive = true;
    this.isShowAllDaysMenuActive = false;
    this.isLoginMenuActive = false;
  }
  ShowAllDaysMenuClick() {
    this.isEnterDataMenuActive = false;
    this.isShowAllDaysMenuActive = true;
    this.isLoginMenuActive = false;
  }
  LoginMenuClick() {
    this.isEnterDataMenuActive = false;
    this.isShowAllDaysMenuActive = false;
    this.isLoginMenuActive = true;
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
  //just test
}
