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
    }
}
