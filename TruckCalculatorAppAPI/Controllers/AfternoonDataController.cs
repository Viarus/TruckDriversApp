using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TruckCalculatorAppAPI.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TruckCalculatorAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AfternoonDataController : ControllerBase
    {
        List<DataToBePosted> timeInDay = new List<DataToBePosted>();
        IdCounter lastId = new IdCounter();
        GetHeader getHeader = new GetHeader();
        string pathToData = @"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\";

        // GET: api/<AfternoonDataController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AfternoonDataController>/5
        [HttpGet("{id}")]
        public DataToBePostedAfternoon Get(string id)
        {
            DataToBePostedAfternoon dayInfo = new DataToBePostedAfternoon();
            if (System.IO.File.Exists(pathToData + "ListOfAllDays.txt"))
            {
                dayInfo = JsonConvert.DeserializeObject<DataToBePostedAfternoon>(System.IO.File.ReadAllText(pathToData + id + ".txt"));
                return dayInfo;
            }
            else
            {
                return dayInfo;
            }
            
        }

        // POST api/<AfternoonDataController>
        [HttpPost]
        public void Post([FromBody] DataToBePostedAfternoon value)
        {
            EnteredDay enteredDay = new EnteredDay();
            enteredDay.Day = value.Day;
            enteredDay.Month = value.Month;
            enteredDay.Year = value.Year;

            List<EnteredDay> listOfAllDaysJSON = new List<EnteredDay>();

            string fileTitle = value.Year.ToString() + '-' + value.Month.ToString() + '-' + value.Day.ToString() + ".txt";

            string specificDayInfoJSON = JsonConvert.SerializeObject(value);
            System.IO.File.WriteAllText(pathToData + fileTitle, specificDayInfoJSON);
            
            if (System.IO.File.Exists(pathToData + "ListOfAllDays.txt"))
            {
                bool isDayTheSame = false;
                bool isMonthTheSame = false;
                bool isYearTheSame = false;
                listOfAllDaysJSON = JsonConvert.DeserializeObject<List<EnteredDay>>(System.IO.File.ReadAllText(pathToData + "ListOfAllDays.txt"));
                //mozna zrobić ładniej
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
                    System.IO.File.WriteAllText(pathToData + "ListOfAllDays.txt", uniqueListOfAllDaysJSON);
                }
            }
            else
            {
                listOfAllDaysJSON.Add(enteredDay);
                string uniqueListOfAllDaysJSON = JsonConvert.SerializeObject(listOfAllDaysJSON);
                System.IO.File.WriteAllText(pathToData + "ListOfAllDays.txt", uniqueListOfAllDaysJSON);
            }
        }

        // PUT api/<AfternoonDataController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AfternoonDataController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
