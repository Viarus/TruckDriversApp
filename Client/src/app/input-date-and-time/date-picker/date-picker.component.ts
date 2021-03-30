import { Component, EventEmitter, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent{

  @Output() eventHandler = new EventEmitter<Date>();

  constructor() { }

  onDateInput(event: MatDatepickerInputEvent<Date>) {
    this.eventHandler.emit(event.value);
  }
}
