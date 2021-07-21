import { Component, DoCheck, OnInit } from '@angular/core';
import { DataService, dataService } from 'src/app/shared/data/data.service';
import { ClockTime } from '../../shared/models/clockTime.model';
import { DayInfo } from '../../shared/models/dayInfo.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements DoCheck, OnInit {

  constructor() { }

  dayInfo: DayInfo = new DayInfo();
  clockTime: ClockTime = new ClockTime();
  timeOfStartClockTime = '';
  timeOfStart2ClockTime = '';
  timeOfFinishClockTime = '';
  timeOfFinish2ClockTime = '';
  dateToBeShown = '';
  dayOfWeek = '';

  ngOnInit(): void {
    dataService.newDayInputEmitter.subscribe(data => {
      this.dayInfo = data;
    });
  }



  ngDoCheck(): void {
    this.timeOfStartClockTime = this.clockTime.showClockLikeFromMinutesOnly(dataService.newDayInfo.TimeOfStart);
    this.timeOfStart2ClockTime = this.clockTime.showClockLikeFromMinutesOnly(this.dayInfo.TimeOfStart2);
    this.timeOfFinishClockTime = this.clockTime.showClockLikeFromMinutesOnly(this.dayInfo.TimeOfFinish);
    this.timeOfFinish2ClockTime = this.clockTime.showClockLikeFromMinutesOnly(this.dayInfo.TimeOfFinish2);
    this.dayOfWeek = this.dayInfo.getDayOfWeek(this.dayInfo.DayOfWeek);
    this.dateToBeShown = this.dayOfWeek + ': ' + this.dayInfo.getDate(this.dayInfo.Day, this.dayInfo.Month, this.dayInfo.Year)
  }

  doStart1andFinish1Collide(): boolean {
    return ((this.dayInfo.TimeOfFinish - this.dayInfo.TimeOfStart) < 80)
      || ((this.dayInfo.TimeOfFinish - this.dayInfo.TimeOfStart) < 150)
      && this.dayInfo.TimeOfStart < 60;
  }

  doStart2andFinish2Collide(): boolean {
    return ((this.dayInfo.TimeOfFinish2 - this.dayInfo.TimeOfStart2) < 150) && this.dayInfo.AddAfternoonTime;
  }

  showFinishTime2(): boolean {
    return !((this.dayInfo.TimeOfFinish2 - this.dayInfo.TimeOfStart2) < 150) && this.dayInfo.AddAfternoonTime;
  }

  showFinishTime2BottomRight(): boolean {
    return ((this.dayInfo.TimeOfFinish2 - this.dayInfo.TimeOfStart2) < 80)
      && this.dayInfo.AddAfternoonTime
      && ((1440 - this.dayInfo.TimeOfFinish2) > 60);
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
      return ((((this.dayInfo.TimeOfFinish2 - this.dayInfo.TimeOfStart2) / (14.4)) / 2).toString() + '%');
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
