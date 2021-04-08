import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { DayInfo } from "Models/DayInfo";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";

export interface FetchedData {
    timeOfStart: number;
    timeOfFinish: number;
    timeOfStart2: number;
    timeOfFinish2: number;
    dayOfWeek: number;
    day: number;
    month: number;
    year: number;
    addAfternoonTime: boolean;
    docId: string;
}

@Injectable({ providedIn: 'root' })
export class FetchingDataService {
    constructor(private db: AngularFirestore) { }
    anyData: any;
    dayInfoArray = new Array<DayInfo>();
    dayInfoFetchedDataArray: Array<FetchedData> = new Array<FetchedData>();
    dayInfoArraySub: Subject<Array<FetchedData>> = new Subject();
    dayInfosample = new DayInfo();

    getCollectionDataSnapshot(path: string) {
        return this.db.collection(path).snapshotChanges();
    }

    getFetchedDataArrayFromCollection(pathToCollection: string) {
        this.getCollectionDataSnapshot(pathToCollection).pipe(take(1)).subscribe(data => {
            this.anyData = data.map(e => {
                return {
                    docId: e.payload.doc.id,
                    timeOfStart: e.payload.doc.data()['timeOfStart'],
                    timeOfStart2: e.payload.doc.data()['timeOfStart2'],
                    timeOfFinish: e.payload.doc.data()['timeOfFinish'],
                    timeOfFinish2: e.payload.doc.data()['timeOfFinish2'],
                    day: e.payload.doc.data()['day'],
                    dayOfWeek: e.payload.doc.data()['dayOfWeek'],
                    month: e.payload.doc.data()['month'],
                    year: e.payload.doc.data()['year'],
                    addAfternoonTime: e.payload.doc.data()['addAfternoonTime']
                };
            })
            let x = 0;
            this.anyData.forEach(element => {
                this.dayInfoFetchedDataArray[x] = element;
                x++;
            })
            this.dayInfoArraySub.next(this.dayInfoFetchedDataArray);
        });

    }

    convertFetchedDataArrayToDayInfoArray(array: Array<FetchedData>): Array<DayInfo> {
        let dayInfoArray: Array<DayInfo> = new Array<DayInfo>();
        array.forEach(element => {
            let dayInfoHolder = new DayInfo();
            dayInfoHolder.AddAfternoonTime = element.addAfternoonTime;
            dayInfoHolder.TimeOfStart = element.timeOfStart;
            dayInfoHolder.TimeOfFinish = element.timeOfFinish;
            dayInfoHolder.Day = element.day;
            dayInfoHolder.DayOfWeek = element.dayOfWeek;
            dayInfoHolder.Month = element.month;
            dayInfoHolder.Year = element.year;
            dayInfoHolder.TimeOfStart2 = element.timeOfStart2;
            dayInfoHolder.TimeOfFinish2 = element.timeOfFinish2;
            dayInfoHolder.DocId = element.docId;
            dayInfoArray.push(dayInfoHolder);
        })
        return dayInfoArray;
    }
}