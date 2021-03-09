import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-circle',
  templateUrl: './loading-circle.component.html',
  styleUrls: ['./loading-circle.component.css'],
  template: '<div class="lds-dual-ring"></div>'
})
export class LoadingCircleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
