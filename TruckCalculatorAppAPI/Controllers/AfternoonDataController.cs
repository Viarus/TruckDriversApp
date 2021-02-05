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
        string pathToData = @"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\";

        // GET: api/<AfternoonDataController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AfternoonDataController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AfternoonDataController>
        [HttpPost]
        public void Post([FromBody] DataToBePostedAfternoon value)
        {
            string fileTitle = value.Year.ToString() + '-' + value.Month.ToString() + '-' + value.Day.ToString();
            lastId = JsonConvert.DeserializeObject<IdCounter>(System.IO.File.ReadAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\Id.txt"));
            lastId.IncrementId2();
            string presentId = JsonConvert.SerializeObject(lastId);
            System.IO.File.WriteAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\Id.txt", presentId);

            string json = JsonConvert.SerializeObject(value);
            System.IO.File.WriteAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\" + fileTitle + ".txt", json);
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
