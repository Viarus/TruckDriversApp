import { DayInfo } from "./dayInfo.model";

export class PostData extends DayInfo {
    public Email: string;
    public Uid: string;
    public Token: string;
    
    constructor(dayInfo: DayInfo, email: string, uid: string, token: string) {
        super();
        this.TimeOfStart = dayInfo.TimeOfStart;
        this.TimeOfStart2 = dayInfo.TimeOfStart2;
        this.TimeOfFinish = dayInfo.TimeOfFinish;
        this.TimeOfFinish2 = dayInfo.TimeOfFinish2;
        this.DayOfWeek = dayInfo.DayOfWeek;
        this.Day = dayInfo.Day;
        this.Month = dayInfo.Month;
        this.Year = dayInfo.Year;
        this.AddAfternoonTime = dayInfo.AddAfternoonTime;
        this.Email = email;
        this.Uid = uid;
        this.Token = token;
    }
}