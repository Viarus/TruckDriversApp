import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {dataService} from 'src/app/shared/data/data.service';
import {ClockTime} from '../../shared/models/clockTime.model';
import {DayInfo} from '../../shared/models/dayInfo.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements DoCheck, OnInit {

  constructor() {
  }

  dayInfo: DayInfo = dataService.newDayInfo;

  timeOfStartClockTime = '';
  timeOfStart2ClockTime = '';
  timeOfFinishClockTime = '';
  timeOfFinish2ClockTime = '';
  dateToBeShown = '';
  dayOfWeek = '';

  ngOnInit(): void {
    dataService.newDayInputEmitter.subscribe(data => {
      this.dayInfo = data;
      console.log(dataService.newDayInfo.TimeOfStart);
    });
  }

  // TODO When graph is no longer visible (Entered Data is Invalid),
  // it unsubscribes and it's not possible to read a new corrected data.

  // ngOnDestroy(): void {
  //   dataService.newDayInputEmitter.unsubscribe();
  // }


  ngDoCheck(): void {
    this.timeOfStartClockTime = ClockTime.showClockLikeFromMinutesOnly(dataService.newDayInfo.TimeOfStart);
    this.timeOfStart2ClockTime = ClockTime.showClockLikeFromMinutesOnly(dataService.newDayInfo.TimeOfStart2);
    this.timeOfFinishClockTime = ClockTime.showClockLikeFromMinutesOnly(dataService.newDayInfo.TimeOfFinish);
    this.timeOfFinish2ClockTime = ClockTime.showClockLikeFromMinutesOnly(dataService.newDayInfo.TimeOfFinish2);
    this.dayOfWeek = dataService.newDayInfo.getDayOfWeek(dataService.newDayInfo.DayOfWeek);
    this.dateToBeShown = this.dayOfWeek + ': ' + dataService.newDayInfo.getDate(this.dayInfo.Day, this.dayInfo.Month, this.dayInfo.Year);
  }

  doStart1andFinish1Collide(): boolean {
    return ((dataService.newDayInfo.TimeOfFinish - dataService.newDayInfo.TimeOfStart) < 80)
      || ((dataService.newDayInfo.TimeOfFinish - dataService.newDayInfo.TimeOfStart) < 150)
      && dataService.newDayInfo.TimeOfStart < 60;
  }

  doStart2andFinish2Collide(): boolean {
    return ((dataService.newDayInfo.TimeOfFinish2 - dataService.newDayInfo.TimeOfStart2) < 150) && dataService.newDayInfo.AddAfternoonTime;
  }

  showFinishTime2(): boolean {
    return !((dataService.newDayInfo.TimeOfFinish2 - dataService.newDayInfo.TimeOfStart2) < 150) && dataService.newDayInfo.AddAfternoonTime;
  }

  showFinishTime2BottomRight(): boolean {
    return ((dataService.newDayInfo.TimeOfFinish2 - dataService.newDayInfo.TimeOfStart2) < 80)
      && dataService.newDayInfo.AddAfternoonTime
      && ((1440 - dataService.newDayInfo.TimeOfFinish2) > 60);
  }

  getFirstNonWorkingTimeWidth(): string {
    return (((dataService.newDayInfo.TimeOfStart) / (14.4)).toString() + '%');
  }

  getFirstWorkingTimeWidth(): string {
    return (((dataService.newDayInfo.TimeOfFinish - dataService.newDayInfo.TimeOfStart) / (14.4)).toString() + '%');
  }

  getSecondNonWorkingTimeWidth(): string {
    if (!dataService.newDayInfo.AddAfternoonTime) {
      return (((1440 - dataService.newDayInfo.TimeOfFinish) / (14.4)).toString() + '%');
    } else {
      return (((dataService.newDayInfo.TimeOfStart2 - dataService.newDayInfo.TimeOfFinish) / (14.4)).toString() + '%');
    }
  }

  getSecondWorkingTimeWidth(): string {
    if (dataService.newDayInfo.AddAfternoonTime) {
      return (((dataService.newDayInfo.TimeOfFinish2 - dataService.newDayInfo.TimeOfStart2) / (14.4)).toString() + '%');
    } else {
      return ('0%');
    }
  }

  getSecondWorkingTimeWidthForText(): string {
    if (dataService.newDayInfo.AddAfternoonTime) {
      return ((((dataService.newDayInfo.TimeOfFinish2 - dataService.newDayInfo.TimeOfStart2) / (14.4)) / 2).toString() + '%');
    } else {
      return ('0%');
    }
  }

  getThirdNonWorkingTimeWidth(): string {
    if (dataService.newDayInfo.AddAfternoonTime) {
      return (((1440 - dataService.newDayInfo.TimeOfFinish2) / (14.4)).toString() + '%');
    } else {
      return ('0%');
    }
  }
}
