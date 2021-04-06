using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TruckCalculatorAppAPI.Models
{
    public class DataToBePostedAfternoon
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
        public DataToBePostedAfternoon()
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
        }
        public Dictionary<string, object> ConvertToFirestoreObject(DataToBePostedAfternoon value)
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
                { "year", value.Year }
            };
            return dayInfo;
        }
    }
}
