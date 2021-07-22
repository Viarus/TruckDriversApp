import {Component, OnInit, DoCheck} from '@angular/core';
import {DayInfo} from '../shared/models/dayInfo.model';
import {dataService} from '../shared/data/data.service';

@Component({
  selector: 'app-output-data',
  templateUrl: './output-data.component.html',
  styleUrls: ['./output-data.component.css']
})
export class OutputDataComponent implements OnInit {
  dayInfo: DayInfo = dataService.newDayInfo;

  constructor() {
  }

  isDayInfoCorrect = false;

  ngOnInit(): void {
    dataService.newDayInputEmitter.subscribe(data => {
      this.isDayInfoCorrect = dataService.isNewDayValid();
    });
  }

  resetTime(): void {
    window.location.reload();
  }
}
