import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { PublicConstants } from 'src/app/shared/constants/public.constants';

@Component({
  selector: 'app-time-picker-second',
  templateUrl: './time-picker-second.component.html',
  styleUrls: ['./time-picker-second.component.css']
})

// TODO REFACTOR
export class TimePickerSecondComponent implements OnInit, OnDestroy {
  timeOfStart = { hour: 15, minute: 0 };
  timeOfFinish = { hour: 21, minute: 0 };

  numberSubscription: Subscription = new Subscription();

  @Input() disableStartTime: boolean = true;
  @Input() disableFinishTime: boolean = true;

  @Input() timeOfStartFromHolder = { hour: PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE, minute: PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE };
  @Input() timeOfFinishFromHolder = { hour: PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE, minute: PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE };

  @Output() eventHandler = new EventEmitter<{ timeOfStart: { hour: number, minute: number }, timeOfFinish: { hour: number, minute: number } }>();
  constructor() { }

  ngOnInit() {
    if (!((this.timeOfStartFromHolder.hour == PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE) || (this.timeOfStartFromHolder.minute == PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE))) {
      this.timeOfStart = this.timeOfStartFromHolder;
    }
    if (!((this.timeOfFinishFromHolder.hour == PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE) || (this.timeOfFinishFromHolder.minute == PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE))) {
      this.timeOfFinish = this.timeOfFinishFromHolder;
    }
    const myNumber = interval(30);
    this.numberSubscription = myNumber.subscribe(val => this.eventHandler.emit({ timeOfStart: this.timeOfStart, timeOfFinish: this.timeOfFinish }));
  }
  ngOnDestroy(): void {
    this.numberSubscription.unsubscribe();
  }
  // timepicker needs to trigger something, but I used interval instead.
  // Otherwise timepicker doesn't see manually entered data - just the one you "click" or "tap".
  blankFunction(): void { }
}
