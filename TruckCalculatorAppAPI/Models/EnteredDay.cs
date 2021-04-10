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

        public string GetFileName(int day, int month, int year)
        {
            string dayString;
            string monthString;
            string yearString = year.ToString();

            if (day < 10)
            {
                dayString = "0" + day.ToString();
            }
            else
            {
                dayString = day.ToString();
            }
            if (month < 10)
            {
                monthString = "0" + month.ToString();
            }
            else
            {
                monthString = month.ToString();
            }

            string fileTitle = dayString + monthString + yearString;
            return fileTitle;
        }
    }

}
