import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { PublicConstants } from 'src/app/shared/constants/public.constants';
import { DataService } from 'src/app/shared/data/data.service';
import { ClockTime } from 'src/app/shared/models/clockTime.model';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit, OnDestroy {
  timeOfStart = new ClockTime(null, null, PublicConstants.DEFAULT_TIME_OF_START);
  timeOfFinish = new ClockTime(null, null, PublicConstants.DEFAULT_TIME_OF_FINISH);
  numberSubscription: Subscription = new Subscription();

  @Input() disableStartTime: boolean = true;
  @Input() disableFinishTime: boolean = true;

  @Output() eventHandler = new EventEmitter<{ timeOfStart: ClockTime, timeOfFinish: ClockTime }>();
  constructor() { }

  ngOnInit() {
    const myNumber = interval(30);
    this.numberSubscription = myNumber.subscribe(val => {
      this.eventHandler.emit({ timeOfStart: this.timeOfStart, timeOfFinish: this.timeOfFinish });
    }
    );
  }
  ngOnDestroy() {
    this.numberSubscription.unsubscribe();
  }
  //timepicker needs to trigger something, but I used interval insted. Otherwise timepicker doesn't see maunaly entered data - just the one you "click/tap".
  blankFunction() { }
}
