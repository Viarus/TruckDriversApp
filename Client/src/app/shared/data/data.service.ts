import { Injectable } from "@angular/core";
import { DayInfo } from "Models/DayInfo";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class DataService {
    //?
    newDayInputEmmiter = new Subject<DayInfo>();
}