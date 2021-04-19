using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TruckCalculatorAppAPI.Models
{
    public class PostedData : DayInfo
    {
        public string Email { get; set; }
        public string Uid { get; set; }
        public string Token { get; set; }

        public DayInfo ExtractDayInfo(PostedData value)
        {
            DayInfo dayInfo = new DayInfo();
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
    }
}
