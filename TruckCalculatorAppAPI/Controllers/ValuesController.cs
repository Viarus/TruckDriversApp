using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TruckCalculatorAppAPI.Models;

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
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] DataToBePosted value)
        {
            lastId = JsonConvert.DeserializeObject<IdCounter>(System.IO.File.ReadAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\Id.txt"));
            lastId.IncrementId();
            string presentId = JsonConvert.SerializeObject(lastId);
            System.IO.File.WriteAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\Id.txt", presentId);
            
            string json = JsonConvert.SerializeObject(value);
            System.IO.File.WriteAllText(@"C:\Programowanie C sharp\TruckCalculatorApp\TruckCalculatorApp\TruckCalculatorAppAPI\Data\Test.txt", json);

            //bool checker = false;
            //timeInDay.Add(value);
            //checker = timeInDay == null;
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
