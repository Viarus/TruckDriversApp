using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TruckCalculatorAppAPI.Models;
using System.Runtime.InteropServices.ComTypes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TruckCalculatorAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        List<DataToBePosted> timeInDay = new List<DataToBePosted>();
        IdCounter lastId = new IdCounter();
        string pathToData = @"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\";

        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public DataToBePostedAfternoon Get(string dayRequired)
        {
            DataToBePostedAfternoon dayInfo = new DataToBePostedAfternoon();
            if (System.IO.File.Exists(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\ListOfAllDays.txt"))
            {
                dayInfo = JsonConvert.DeserializeObject<DataToBePostedAfternoon>(System.IO.File.ReadAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\" + dayRequired + ".txt"));
                return dayInfo;
            }
            else
            {
                return dayInfo;
            }

        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] DataToBePosted value)
        {
            EnteredDay enteredDay = new EnteredDay();
            enteredDay.Day = value.Day;
            enteredDay.Month = value.Month;
            enteredDay.Year = value.Year;

            string fileTitle = value.Year.ToString() + '-' + value.Month.ToString() + '-' + value.Day.ToString();

            //specified day saving
            string specificDayInfoJSON = JsonConvert.SerializeObject(value);
            System.IO.File.WriteAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\" + fileTitle + ".txt", specificDayInfoJSON);

            List<EnteredDay> listOfAllDaysJSON = new List<EnteredDay>();

            if (System.IO.File.Exists(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\ListOfAllDays.txt"))
            {
                bool isDayTheSame = false;
                bool isMonthTheSame = false;
                bool isYearTheSame = false;
                listOfAllDaysJSON = JsonConvert.DeserializeObject<List<EnteredDay>>(System.IO.File.ReadAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\ListOfAllDays.txt"));
                foreach (var element in listOfAllDaysJSON)
                {
                    if (element.Day == enteredDay.Day)
                    {
                        isDayTheSame = true;
                    }
                    if (element.Month == enteredDay.Month)
                    {
                        isMonthTheSame = true;
                    }
                    if (element.Year == enteredDay.Year)
                    {
                        isYearTheSame = true;
                    }
                }
                if (!(isDayTheSame && isMonthTheSame && isYearTheSame))
                {
                    listOfAllDaysJSON.Add(enteredDay);
                    string uniqueListOfAllDaysJSON = JsonConvert.SerializeObject(listOfAllDaysJSON);
                    System.IO.File.WriteAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\ListOfAllDays.txt", uniqueListOfAllDaysJSON);
                }
            }
            else
            {
                listOfAllDaysJSON.Add(enteredDay);
                string uniqueListOfAllDaysJSON = JsonConvert.SerializeObject(listOfAllDaysJSON);
                System.IO.File.WriteAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\ListOfAllDays.txt", uniqueListOfAllDaysJSON);
            }
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
