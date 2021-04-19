import { Component, OnInit, DoCheck } from '@angular/core';
import { DayInfo } from '../shared/models/dayInfo.model';
import { DataService } from '../shared/data/data.service';

@Component({
  selector: 'app-output-data',
  templateUrl: './output-data.component.html',
  styleUrls: ['./output-data.component.css']
})
export class OutputDataComponent implements OnInit, DoCheck {
  dayInfo: DayInfo = new DayInfo();

  constructor(private dataService: DataService) { }

  isDayInfoCorrect: boolean = false;

  ngDoCheck() {

    if (this.dayInfo.TimeOfStart >= this.dayInfo.TimeOfFinish) {
      this.isDayInfoCorrect = false;
    }
    else if ((this.dayInfo.TimeOfStart2 >= this.dayInfo.TimeOfFinish2) && this.dayInfo.AddAfternoonTime) {
      this.isDayInfoCorrect = false;
    }
    else if ((this.dayInfo.TimeOfStart2 <= this.dayInfo.TimeOfFinish) && this.dayInfo.AddAfternoonTime) {
      this.isDayInfoCorrect = false;
    }
    else {
      this.isDayInfoCorrect = true;
    }
  }

  ngOnInit(): void {
    this.dataService.newDayInputEmmiter.subscribe(data => {
      this.dayInfo = data;
    });
  }

  resetTime(){
    window.location.reload();
  }
}
