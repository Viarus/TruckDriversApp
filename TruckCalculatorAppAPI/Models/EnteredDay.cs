using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TruckCalculatorAppAPI.Models
{
    public class EnteredDay
    {
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }

        public EnteredDay()
        {
            Day = 0;
            Month = 0;
            Year = 0;
        }

        
    }

}
