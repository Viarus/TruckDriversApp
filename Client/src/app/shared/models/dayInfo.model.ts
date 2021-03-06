export class DayInfo {
  TimeOfStart: number;
  TimeOfFinish: number;
  TimeOfStart2: number;
  TimeOfFinish2: number;
  DayOfWeek: number;
  Day: number;
  Month: number;
  Year: number;
  AddAfternoonTime: boolean;

  DocId?: string;
  TimeOfStartClockLike?: string;
  TimeOfFinishClockLike?: string;
  TimeOfStart2ClockLike?: string;
  TimeOfFinish2ClockLike?: string;
  DayOfWeekString?: string;

  constructor() {
    this.TimeOfStart = 0;
    this.TimeOfFinish = 720;
    this.TimeOfStart2 = 900;
    this.TimeOfFinish2 = 1260;
    this.DayOfWeek = 2000;
    this.Day = 2000;
    this.Month = 2000;
    this.Year = 2000;
    this.AddAfternoonTime = false;
    this.DocId = "notValid";
  }
  getDayOfWeek(d: number): string {

    //I think there is a better approach
    let lang = localStorage.getItem('lang') || 'en';
    let daysOfWeek = new Array<string>();
    if (lang == 'en'){
      daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Please Enter a Day', 'Error'];
    }
    else if (lang == 'pl') {
      daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela', 'Wprowadź dzień', 'Błąd'];
    }

    switch (d) {
      case 1: {
        return daysOfWeek[0];
      }
      case 2: {
        return daysOfWeek[1];
      }
      case 3: {
        return daysOfWeek[2];
      }
      case 4: {
        return daysOfWeek[3];
      }
      case 5: {
        return daysOfWeek[4];
      }
      case 6: {
        return daysOfWeek[5];
      }
      case 0: {
        return daysOfWeek[6];
      }
      case 2000: {
        return daysOfWeek[7];
      }
      default: {
        return daysOfWeek[8];
      }
    } 
  }
  getDate(day: number, month: number, year: number): string {
    let dayToShow: string;
    let monthToShow: string;
    let yearToShow: string = year.toString();
    if (day < 10) {
      dayToShow = '0' + day.toString();
    }
    else {
      dayToShow = day.toString();
    }
    if (month < 10) {
      monthToShow = '0' + month.toString();
    }
    else {
      monthToShow = month.toString();
    }

    return dayToShow + '/' + monthToShow + '/' + yearToShow;
  }
}


