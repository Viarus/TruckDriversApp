using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TruckCalculatorAppAPI.Models
{
    public class PostedData
    {
        public int TimeOfStart { get; set; }
        public int TimeOfStart2 { get; set; }
        public int TimeOfFinish { get; set; }
        public int TimeOfFinish2 { get; set; }
        public bool AddAfternoonTime { get; set; }
        public int DayOfWeek { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string Email { get; set; }
        public string Uid { get; set; }
        public string Token { get; set; }
        public PostedData()
        {
            TimeOfStart = 2000;
            TimeOfStart2 = 2000;
            TimeOfFinish = 2000;
            TimeOfFinish2 = 2000;
            AddAfternoonTime = true;
            DayOfWeek = 0;
            Day = 0;
            Month = 0;
            Year = 0;
            Email = "notValid";
            Uid = "notValid";
            Token = "notValid";
        }

        public DataToBePostedAfternoon ExtractDayInfo(PostedData value)
        {
            DataToBePostedAfternoon dayInfo = new DataToBePostedAfternoon();
            dayInfo.TimeOfStart = value.TimeOfStart;
            dayInfo.TimeOfStart2 = value.TimeOfStart2;
            dayInfo.TimeOfFinish = value.TimeOfFinish;
            dayInfo.TimeOfFinish2 = value.TimeOfFinish2;
            dayInfo.AddAfternoonTime = value.AddAfternoonTime;
            dayInfo.DayOfWeek = value.DayOfWeek;
            dayInfo.Day = value.Day;
            dayInfo.Month = value.Month;
            dayInfo.Year = value.Year;
            return dayInfo;
        }
        public User ExtractUser(PostedData value)
        {
            User user = new User();
            user.Email = value.Email;
            user.Uid = value.Uid;
            user.Token = value.Token;
            return user;
        }
        public Dictionary<string, object> ConvertToFirestoreObject(PostedData value)
        {
            Dictionary<string, object> dayInfo = new Dictionary<string, object>
            {

            { "timeOfStart", value.TimeOfStart },
                { "timeOfStart2", value.TimeOfStart2 },
                { "timeOfFinish", value.TimeOfFinish },
                { "timeOfFinish2", value.TimeOfFinish2 },
                { "addAfternoonTime", value.AddAfternoonTime },
                { "dayOfWeek", value.DayOfWeek },
                { "day", value.Day },
                { "month", value.Month },
                { "year", value.Year },
                { "email", value.Email },
                { "uid", value.Uid },
                { "token", value.Token},
            };
            return dayInfo;
        }
        public bool IsDayInfoValid(PostedData dayInfo)
        {
            if ((dayInfo.TimeOfStart >= dayInfo.TimeOfFinish)
                || (dayInfo.TimeOfStart >= dayInfo.TimeOfStart2)
                || (dayInfo.TimeOfFinish >= dayInfo.TimeOfStart2)
                || ((dayInfo.TimeOfStart2 >= dayInfo.TimeOfFinish2)
                    && ((dayInfo.TimeOfStart2 != 2000)
                        || (dayInfo.TimeOfFinish2 != 2000)))
                || (dayInfo.TimeOfStart < 0)
                || (dayInfo.TimeOfStart >= 1440)
                || (dayInfo.TimeOfStart2 < 0)
                || (dayInfo.TimeOfFinish < 0)
                || (dayInfo.TimeOfFinish > 1440)
                || (dayInfo.TimeOfFinish2 < 0))
            {
                return false;
            }
            else if (((dayInfo.TimeOfFinish2 > 1440) && (dayInfo.TimeOfFinish2 != 2000))
                || ((dayInfo.TimeOfStart2 >= 1440) && (dayInfo.TimeOfStart2 != 2000)))
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
    //    isDayInfoValid(dayInfo: DayInfo) : boolean {
    //    if ((dayInfo.TimeOfStart >= dayInfo.TimeOfFinish)
    //        || (dayInfo.TimeOfStart >= dayInfo.TimeOfStart2)
    //        || (dayInfo.TimeOfFinish >= dayInfo.TimeOfStart2)
    //        || ((dayInfo.TimeOfStart2 >= dayInfo.TimeOfFinish2)
    //            && ((dayInfo.TimeOfStart2 !== this.publicConstants.defaultValueForTime)
    //                || (dayInfo.TimeOfFinish2 !== this.publicConstants.defaultValueForTime)))
    //        || (dayInfo.TimeOfStart< 0)
    //        || (dayInfo.TimeOfStart >= 1440)
    //        || (dayInfo.TimeOfStart2< 0)
    //        || (dayInfo.TimeOfFinish< 0)
    //        || (dayInfo.TimeOfFinish > 1440)
    //        || (dayInfo.TimeOfFinish2< 0)) {
    //        return false;
    //    }
    //    else if (((dayInfo.TimeOfFinish2 > 1440) && (dayInfo.TimeOfFinish2 !== this.publicConstants.defaultValueForTime))
    //        || ((dayInfo.TimeOfStart2 >= 1440) && (dayInfo.TimeOfStart2 !== this.publicConstants.defaultValueForTime))) {
    //    return false;
    //}
    //    else {
    //    return true;
    //}
    //}
}
