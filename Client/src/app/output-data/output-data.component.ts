import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { DayInfo } from '../../../Models/DayInfo';

@Component({
  selector: 'app-output-data',
  templateUrl: './output-data.component.html',
  styleUrls: ['./output-data.component.css']
})
export class OutputDataComponent implements OnInit, DoCheck {
  @Input() dayInfo: DayInfo = new DayInfo();

  constructor() { }

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
  }

}
