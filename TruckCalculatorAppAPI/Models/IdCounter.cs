using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TruckCalculatorAppAPI.Models
{
    public class IdCounter
    {
        public int Id { get; set; }

        public IdCounter()
        {
            Id = 0;
        }

        public void IncrementId()
        {
            Id += 1;
        }
    }
}
