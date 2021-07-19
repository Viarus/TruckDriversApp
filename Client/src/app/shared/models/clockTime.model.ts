import { PublicConstants } from "../constants/public.constants";

export class ClockTime {
  minutes: number;
  hours: number;
  constructor() {
    this.minutes = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
    this.hours = PublicConstants.DEFAULT_VALUE_FOR_TIME_AND_DATE;
  }
  showClockLikeFromMinutesOnly(minutes: number): string {
    let clockTime: ClockTime = new ClockTime();
    clockTime = clockTime.toClockTime(minutes);
    let clockMinutes: number = clockTime.minutes;
    let clockHours: number = clockTime.hours;
    let minutesToShow: string;
    let hoursToShow: string;
    if (clockMinutes < 10) {
      minutesToShow = '0' + clockMinutes.toString();
    }
    else {
      minutesToShow = clockMinutes.toString();
    }
    if (clockHours < 10) {
      hoursToShow = '0' + clockHours.toString();
    }
    else {
      hoursToShow = clockHours.toString();
    }
    return (hoursToShow + ':' + minutesToShow)
    //return '22'
  }
  showClockLike(minutes: number, hours: number): string {
    let clockMinutes: string;
    let clockHours: string;
    if (minutes < 10) {
      clockMinutes = '0' + minutes.toString();
    }
    else {
      clockMinutes = minutes.toString();
    }
    if (hours < 10) {
      clockHours = '0' + hours.toString();
    }
    else {
      clockHours = hours.toString();
    }
    return (clockHours + ':' + clockMinutes)
  }
  toClockTime(minutes: number): ClockTime {
    let a: ClockTime = new ClockTime();
    a.minutes = minutes % 60;
    a.hours = Math.floor(minutes / 60);
    return a;
  }
}


