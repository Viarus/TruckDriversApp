import {Component, Input, DoCheck} from '@angular/core';
import {PublicConstants} from 'src/app/shared/constants/public.constants';
import {ClockTime} from '../../shared/models/clockTime.model';
import {dataService} from '../../shared/data/data.service';

@Component({
  selector: 'app-time-picker-second',
  templateUrl: './time-picker-second.component.html',
  styleUrls: ['./time-picker-second.component.css']
})

// TODO REFACTOR
export class TimePickerSecondComponent implements DoCheck {
  timeOfStart = {hour: PublicConstants.DEFAULT_TIME_OF_START_2_HOUR, minute: PublicConstants.DEFAULT_TIME_OF_START_2_MINUTE};
  timeOfFinish = {hour: PublicConstants.DEFAULT_TIME_OF_FINISH_2_HOUR, minute: PublicConstants.DEFAULT_TIME_OF_FINISH_2_MINUTE};

  @Input() disableStartTime = true;
  @Input() disableFinishTime = true;

  constructor() {
  }

  ngDoCheck(): void {
    const timeOfStartClockTime = new ClockTime(this.timeOfStart.hour, this.timeOfStart.minute);
    const timeOfFinishClockTime = new ClockTime(this.timeOfFinish.hour, this.timeOfFinish.minute);

    const timeOfStartInMinutes = ClockTime.toMinutesOnly(timeOfStartClockTime);
    const timeOfFinishInMinutes = ClockTime.toMinutesOnly(timeOfFinishClockTime);
    if (dataService.isNotTodayFinishedChecked2){
      dataService.updateNewDayTimes(null, null, timeOfStartInMinutes);
    } else {
      dataService.updateNewDayTimes(null, null, timeOfStartInMinutes, timeOfFinishInMinutes);
    }
  }
}
