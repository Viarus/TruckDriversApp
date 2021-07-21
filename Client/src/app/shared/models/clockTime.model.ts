export class ClockTime {

  constructor(hours: number, minutes: number) {
    this.hours = hours;
    this.minutes = minutes;
  }
  minutes: number;
  hours: number;

  static toClockTime(minutes: number): ClockTime {
    return new ClockTime((Math.floor(minutes / 60)), (minutes % 60));
  }

  static toMinutesOnly(clockTime: ClockTime): number {
    return (clockTime.hours * 60) + clockTime.minutes;
  }

  // convertToClockTimeFromMinutesOnly(num): void {
  //   const convertedValue = this.toClockTime(num);
  //   this.hours = convertedValue.hours;
  //   this.minutes = convertedValue.minutes;
  // }

  // make below static
  static showClockLikeFromMinutesOnly(minutes: number): string {
    const clockTime: ClockTime = ClockTime.toClockTime(minutes);
    const clockMinutes: number = clockTime.minutes;
    const clockHours: number = clockTime.hours;
    let minutesToShow: string;
    let hoursToShow: string;
    if (clockMinutes < 10) {
      minutesToShow = '0' + clockMinutes.toString();
    } else {
      minutesToShow = clockMinutes.toString();
    }
    if (clockHours < 10) {
      hoursToShow = '0' + clockHours.toString();
    } else {
      hoursToShow = clockHours.toString();
    }
    return (hoursToShow + ':' + minutesToShow);
  }

  showClockLike(clockTime: ClockTime): string {
    let clockMinutes: string;
    let clockHours: string;
    if (clockTime.minutes < 10) {
      clockMinutes = '0' + clockTime.minutes.toString();
    } else {
      clockMinutes = clockTime.minutes.toString();
    }
    if (clockTime.hours < 10) {
      clockHours = '0' + clockTime.hours.toString();
    } else {
      clockHours = clockTime.hours.toString();
    }
    return (clockHours + ':' + clockMinutes);
  }
}


