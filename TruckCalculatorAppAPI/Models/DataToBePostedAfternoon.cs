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
    }
}
