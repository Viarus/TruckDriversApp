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
  }
  getDayOfWeekInPolish(d: number): string {
    switch (d) {
      case 1: {
        return 'Poniedziałek'
        break;
      }
      case 2: {
        return 'Wtorek'
        break;
      }
      case 3: {
        return 'Środa'
        break;
      }
      case 4: {
        return 'Czwartek'
        break;
      }
      case 5: {
        return 'Piątek'
        break;
      }
      case 6: {
        return 'Sobota'
        break;
      }
      case 0: {
        return 'Niedziela'
        break;
      }
      case 2000: {
        return 'Wprowadź dzień'
        break;
      }
      default: {
        return 'Błąd'
        break;
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


