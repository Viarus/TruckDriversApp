import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data/data.service';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit, OnDestroy {
  timeOfStart = { hour: 4, minute: 0 };
  timeOfFinish = { hour: 12, minute: 0 };

  numberSubscription: Subscription = new Subscription();

  @Input() disableStartTime: boolean = true;
  @Input() disableFinishTime: boolean = true;

  @Output() eventHandler = new EventEmitter<{ timeOfStart: { hour: number, minute: number }, timeOfFinish: { hour: number, minute: number } }>();
  constructor(private dataService: DataService) { }

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
