import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DayInfo } from '../../../Models/DayInfo';

@Injectable()
export class ConfigService {
  constructor() { }
}

@Component({
  selector: 'app-list-of-all-days',
  templateUrl: './list-of-all-days.component.html',
  styleUrls: ['./list-of-all-days.component.css']
})
export class ListOfAllDaysComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dayRequired: string = '2021-2-1';

  header: HttpHeaders = new HttpHeaders({ DayRequired: this.dayRequired });

  

  dayInfo: DayInfo = new DayInfo();

  ngOnInit(): void {
    this.http.get<DayInfo>('https://localhost:44396/api/afternoondata/' + this.dayRequired).
      subscribe(p => this.dayInfo = p)
  }
  showSomething(): void {
    console.log(this.dayInfo);
  }

}
