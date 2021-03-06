import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { PublicConstants } from 'src/app/shared/constants/public.constants';

@Component({
  selector: 'app-time-picker-second',
  templateUrl: './time-picker-second.component.html',
  styleUrls: ['./time-picker-second.component.css']
})
export class TimePickerSecondComponent implements OnInit, OnDestroy {
  timeOfStart = { hour: 15, minute: 0 };
  timeOfFinish = { hour: 21, minute: 0 };

  numberSubscription: Subscription = new Subscription();

  @Input() disableStartTime: boolean = true;
  @Input() disableFinishTime: boolean = true;

  @Input() timeOfStartFromHolder = { hour: this.publicConstants.defaultValueForTime, minute: this.publicConstants.defaultValueForTime };
  @Input() timeOfFinishFromHolder = { hour: this.publicConstants.defaultValueForTime, minute: this.publicConstants.defaultValueForTime };

  @Output() eventHandler = new EventEmitter<{ timeOfStart: { hour: number, minute: number }, timeOfFinish: { hour: number, minute: number } }>();
  constructor(private publicConstants: PublicConstants) { }

  ngOnInit() {
    if (!((this.timeOfStartFromHolder.hour == this.publicConstants.defaultValueForTime) || (this.timeOfStartFromHolder.minute == this.publicConstants.defaultValueForTime))) {
      this.timeOfStart = this.timeOfStartFromHolder;
    }
    if (!((this.timeOfFinishFromHolder.hour == this.publicConstants.defaultValueForTime) || (this.timeOfFinishFromHolder.minute == this.publicConstants.defaultValueForTime))) {
      this.timeOfFinish = this.timeOfFinishFromHolder;
    }
    const myNumber = interval(30);
    this.numberSubscription = myNumber.subscribe(val => this.eventHandler.emit({ timeOfStart: this.timeOfStart, timeOfFinish: this.timeOfFinish }));
  }
  ngOnDestroy() {
    this.numberSubscription.unsubscribe();
  }
  //timepicker needs to trigger something, but I used interval insted. Otherwise timepicker doesn't see maunaly entered data - just the one you "click" or "tap".
  blankFunction() { } //do not delete!
}
