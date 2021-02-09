import { Component, Input, DoCheck, OnInit } from '@angular/core';
import { ClockTime } from '../../../../Models/ClockTime';
import { DayInfo } from '../../../../Models/DayInfo';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements DoCheck, OnInit {

  constructor() { };

  ngOnInit(): void { };

  @Input() dayInfo: DayInfo = new DayInfo();
  clockTime: ClockTime = new ClockTime();
  timeOfStartClockTime: string;
  timeOfStart2ClockTime: string;
  timeOfFinishClockTime: string;
  timeOfFinish2ClockTime: string;
  dateToBeShown: string;
  dayOfWeek: string;


  ngDoCheck() {
    this.timeOfStartClockTime = this.clockTime.showClockLikeFromMinutesOnly(this.dayInfo.TimeOfStart);
    this.timeOfStart2ClockTime = this.clockTime.showClockLikeFromMinutesOnly(this.dayInfo.TimeOfStart2);
    this.timeOfFinishClockTime = this.clockTime.showClockLikeFromMinutesOnly(this.dayInfo.TimeOfFinish);
    this.timeOfFinish2ClockTime = this.clockTime.showClockLikeFromMinutesOnly(this.dayInfo.TimeOfFinish2);
    this.dayOfWeek = this.dayInfo.getDayOfWeekInPolish(this.dayInfo.DayOfWeek);
    this.dateToBeShown = this.dayOfWeek + ': ' + this.dayInfo.getDate(this.dayInfo.Day, this.dayInfo.Month, this.dayInfo.Year)
  }

  doStart1andFinish1Collide(): boolean {
    if (((this.dayInfo.TimeOfFinish - this.dayInfo.TimeOfStart) < 80) || ((this.dayInfo.TimeOfFinish - this.dayInfo.TimeOfStart) < 150) && this.dayInfo.TimeOfStart < 60) {
      return true;
    }
    else {
      return false;
    }
  }

  doStart2andFinish2Collide(): boolean {
    if (((this.dayInfo.TimeOfFinish2 - this.dayInfo.TimeOfStart2) < 150) && this.dayInfo.AddAfternoonTime) {
      return true;
    }
    else {
      return false;
    }
  }

  showFinishTime2(): boolean {
    if (!((this.dayInfo.TimeOfFinish2 - this.dayInfo.TimeOfStart2) < 150) && this.dayInfo.AddAfternoonTime) {
      return true;
    }
    else {
      return false;
    }
  }

  showFinishTime2BottomRight(): boolean {
    if (((this.dayInfo.TimeOfFinish2 - this.dayInfo.TimeOfStart2) < 80) && this.dayInfo.AddAfternoonTime && ((1440 - this.dayInfo.TimeOfFinish2) > 60 )) {
      return true;
    }
    else {
      return false;
    }
  }

  getFirstNonWorkingTimeWidth(): string {
    return (((this.dayInfo.TimeOfStart) / (14.4)).toString() + '%');
  }

  getFirstWorkingTimeWidth(): string {
    return (((this.dayInfo.TimeOfFinish - this.dayInfo.TimeOfStart) / (14.4)).toString() + '%');
  }

  getSecondNonWorkingTimeWidth(): string {
    if (!this.dayInfo.AddAfternoonTime) {
      return (((1440 - this.dayInfo.TimeOfFinish) / (14.4)).toString() + '%');
    }
    else {
      return (((this.dayInfo.TimeOfStart2 - this.dayInfo.TimeOfFinish) / (14.4)).toString() + '%');
    }
  }

  getSecondWorkingTimeWidth(): string {
    if (this.dayInfo.AddAfternoonTime) {
      return (((this.dayInfo.TimeOfFinish2 - this.dayInfo.TimeOfStart2) / (14.4)).toString() + '%');
    }
    else {
      return ('0%');
    }
  }

  getSecondWorkingTimeWidthForText(): string {
    if (this.dayInfo.AddAfternoonTime) {
      return ((((this.dayInfo.TimeOfFinish2 - this.dayInfo.TimeOfStart2) / (14.4))/2).toString() + '%');
    }
    else {
      return ('0%');
    }
  }

  getThirdNonWorkingTimeWidth(): string {
    if (this.dayInfo.AddAfternoonTime) {
      return (((1440 - this.dayInfo.TimeOfFinish2) / (14.4)).toString() + '%');
    }
    else {
      return ('0%');
    }
  }
}
