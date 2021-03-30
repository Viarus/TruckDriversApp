import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
/* import { DayInfo } from 'Models/DayInfo';
import { DataService } from 'src/app/shared/data/data.service'; */

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Output() eventHandler = new EventEmitter<Date>();

/*   date: Date = new Date();
  newDayInfo: DayInfo = new DayInfo(); */

  constructor(/* private dataService: DataService */) { }

  ngOnInit(): void {
/*     this.newDayInfo = this.dataService.getNewDayInfo();
    this.dataService.setTodayDate();
    this.date.setDate(this.newDayInfo.Day);
    this.date.setFullYear(this.newDayInfo.Year);
    this.date.setMonth(this.newDayInfo.Month); */
  }

  onDateInput(event: MatDatepickerInputEvent<Date>) {
    this.eventHandler.emit(event.value);
  }
}
