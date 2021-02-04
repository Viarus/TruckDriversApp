import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() { }

  exampleOfWidth: number = 1000;

  ngOnInit(): void {
  }
  getColor(): string {
    if (this.isDrivingTime()) {
      return "blue";
    }
  }

  isDrivingTime(): boolean {
    return true;
  }

  getWidth(a): string {
    return ((a/10).toString() + 'px');
  }
}
