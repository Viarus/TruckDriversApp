import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { PublicConstants } from 'src/app/shared/constants/public.constants';
import { dataService } from 'src/app/shared/data/data.service';
import { ClockTime } from 'src/app/shared/models/clockTime.model';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit, OnDestroy {

  // must be in dictionaries like that - otherwise timepicker will not assign the values
  timeOfStart = { hour: 4, minute: 0 };
  timeOfFinish = { hour: 8, minute: 0 };

  timeOfStartClockTime = new ClockTime(this.timeOfStart.hour, this.timeOfStart.minute);
  timeOfFinishClockTime = new ClockTime(this.timeOfFinish.hour, this.timeOfFinish.minute);

  timeOfStartInMinutes = this.timeOfStartClockTime.toMinutesOnly(this.timeOfStartClockTime);
  timeOfFinishInMinutes = this.timeOfStartClockTime.toMinutesOnly(this.timeOfFinishClockTime);

  numberSubscription: Subscription = new Subscription();

  @Input() disableStartTime = true;
  @Input() disableFinishTime = true;

  // @Output() eventHandler = new EventEmitter<{ timeOfStart: ClockTime, timeOfFinish: ClockTime }>();
  constructor() { }

  ngOnInit(): void {
    const myNumber = interval(30);
    this.numberSubscription = myNumber.subscribe(val => {
        console.log(this.timeOfStartClockTime);
        dataService.updateNewDayTimes(this.timeOfStartInMinutes, this.timeOfFinishInMinutes);
        // this.eventHandler.emit({ timeOfStart: this.timeOfStart, timeOfFinish: this.timeOfFinish });
    }
    );
  }
  ngOnDestroy(): void {
    this.numberSubscription.unsubscribe();
  }
  // timepicker needs to trigger something, but I used interval instead.
  // Otherwise timepicker doesn't see manually entered data - just the one you "click/tap".
  blankFunction(): void { }
}
