﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TruckCalculatorAppAPI.Models
{
    public class DayInfo
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
        public DayInfo()
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
        public Dictionary<string, object> ConvertToFirestoreObject(DayInfo value)
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
        public string GetFileName(DayInfo value)
        {
            string dayString;
            string monthString;
            string yearString = value.Year.ToString();

            if (value.Day < 10)
            {
                dayString = "0" + value.Day.ToString();
            }
            else
            {
                dayString = value.Day.ToString();
            }
            if (value.Month < 10)
            {
                monthString = "0" + value.Month.ToString();
            }
            else
            {
                monthString = value.Month.ToString();
            }

            string fileTitle = yearString + "-" + monthString + "-" + dayString;
            return fileTitle;
        }
        public bool IsDayInfoValid(DayInfo dayInfo)
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
}
