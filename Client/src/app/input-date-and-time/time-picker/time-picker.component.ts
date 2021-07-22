import {Component, Input, DoCheck} from '@angular/core';
import {dataService} from 'src/app/shared/data/data.service';
import {ClockTime} from 'src/app/shared/models/clockTime.model';
import {PublicConstants} from '../../shared/constants/public.constants';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements DoCheck {

  // must be in dictionaries like that - otherwise timepicker will not assign the values
  timeOfStart = {hour: PublicConstants.DEFAULT_TIME_OF_START_HOUR, minute: PublicConstants.DEFAULT_TIME_OF_START_MINUTE};
  timeOfFinish = {hour: PublicConstants.DEFAULT_TIME_OF_FINISH_HOUR, minute: PublicConstants.DEFAULT_TIME_OF_FINISH_MINUTE};

  @Input() disableStartTime = true;
  @Input() disableFinishTime = true;

  constructor() {
  }

  ngDoCheck(): void {
    const timeOfStartClockTime = new ClockTime(this.timeOfStart.hour, this.timeOfStart.minute);
    const timeOfFinishClockTime = new ClockTime(this.timeOfFinish.hour, this.timeOfFinish.minute);

    const timeOfStartInMinutes = ClockTime.toMinutesOnly(timeOfStartClockTime);
    const timeOfFinishInMinutes = ClockTime.toMinutesOnly(timeOfFinishClockTime);

    if (dataService.isNotTodayStartedChecked) {
      dataService.updateNewDayTimes(null, timeOfFinishInMinutes);
    } else if (dataService.isNotTodayFinishedChecked) {
      dataService.updateNewDayTimes(timeOfStartInMinutes);
    } else {
      dataService.updateNewDayTimes(timeOfStartInMinutes, timeOfFinishInMinutes);
    }
  }
}
