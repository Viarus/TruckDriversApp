using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TruckCalculatorAppAPI.Models
{
    public class FetchedData : DayInfo
    {
        public string DocId { get; set; }
        public FetchedData()
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
            DocId = "notValid";
        }
        public FetchedData ToFetchedData(Dictionary<string, object> value, string docId)
        {
            FetchedData dayInfo = new FetchedData();
            {
                dayInfo.DocId = docId;
                dayInfo.TimeOfStart = (int)(long)value["timeOfStart"];
                dayInfo.TimeOfStart2 = (int)(long)value["timeOfStart2"];
                dayInfo.TimeOfFinish = (int)(long)value["timeOfFinish"];
                dayInfo.TimeOfFinish2 = (int)(long)value["timeOfFinish2"];
                dayInfo.AddAfternoonTime = (bool)value["addAfternoonTime"];
                dayInfo.Day = (int)(long)value["day"];
                dayInfo.DayOfWeek = (int)(long)value["dayOfWeek"];
                dayInfo.Month = (int)(long)value["month"];
                dayInfo.Year = (int)(long)value["year"];
            }
            return dayInfo;
        }
    }
}
