import { DayInfo } from "./dayInfo.model";

export class PostData {
    public TimeOfStart: number;
    public TimeOfFinish: number;
    public TimeOfStart2: number;
    public TimeOfFinish2: number;
    public DayOfWeek: number;
    public Day: number;
    public Month: number;
    public Year: number;
    public AddAfternoonTime: boolean;
    public Email: string;
    public Uid: string;
    public Token: string;
    
    constructor(dayInfo: DayInfo, email: string, uid: string, token: string) {
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