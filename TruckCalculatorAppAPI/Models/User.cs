using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TruckCalculatorAppAPI.Models
{
    public class User
    {
        public string Email { get; set; }
        public string Uid { get; set; }
        public string Token { get; set; }
        public DateTime? TokenExpirationDate { get; set; }
        public User()
        {
            this.Email = "notValid";
            this.Uid = "notValid";
            this.Token = "notValid";
            TokenExpirationDate = null;
        }
    }
}
