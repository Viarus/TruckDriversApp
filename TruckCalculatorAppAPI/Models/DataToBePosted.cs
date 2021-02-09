﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TruckCalculatorAppAPI.Models
{
//      dataToBePostedMorning:
//    { timeOfStart: number, timeOfFinish: number, addAfternoonTime: boolean
//} = { timeOfStart: this.timeOfStart, timeOfFinish: this.timeOfFinish, addAfternoonTime: this.showNewTimeRange };

public class DataToBePosted
    {
        public int TimeOfStart { get; set; }
        public int TimeOfFinish { get; set; }
        public bool AddAfternoonTime { get; set; }
        public int DayOfWeek { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public DataToBePosted()
        {
            TimeOfStart = 2000;
            TimeOfFinish = 2000;
            AddAfternoonTime = false;
            DayOfWeek = 0;
            Day = 0;
            Month = 0;
            Year = 0;
        }
    }
}
