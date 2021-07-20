export class ClockTime {
  minutes: number;
  hours: number;
  constructor(hours?: number, minutes?: number, minutesOnly?: number) {
    if (!!hours) {this.hours = hours}
    if (!!minutes) {this.minutes = minutes}
    if (!hours && !minutes && !! minutesOnly) {this.convertToClockTimeFromMinutesOnly(minutesOnly)}
   }

   convertToClockTimeFromMinutesOnly(number){
     let convertedValue = this.toClockTime(number);
     this.hours = convertedValue.hours;
     this.minutes = convertedValue.minutes;
   }

   //make below static
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
  }
  showClockLike(clockTime: ClockTime): string {
    let clockMinutes: string;
    let clockHours: string;
    if (clockTime.minutes < 10) {
      clockMinutes = '0' + clockTime.minutes.toString();
    }
    else {
      clockMinutes = clockTime.minutes.toString();
    }
    if (clockTime.hours < 10) {
      clockHours = '0' + clockTime.hours.toString();
    }
    else {
      clockHours = clockTime.hours.toString();
    }
    return (clockHours + ':' + clockMinutes)
  }
  toClockTime(minutes: number): ClockTime {
    let a: ClockTime = new ClockTime();
    a.minutes = minutes % 60;
    a.hours = Math.floor(minutes / 60);
    return a;
  }

  toMinutesOnly(clockTime: ClockTime): number{
    return (clockTime.hours * 60) + clockTime.minutes;
  }
}


