using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TruckCalculatorAppAPI.Models
{
    // export class User {
    //     public email: string;
    //     public id: string;
    //     public _token: string;
    //     public _tokenExpirationDate: Date;
    //     constructor() { 
    //         this.email = "notValid",
    //         this.id = "notValid",
    //         this._token = "notValid",
    //         this._tokenExpirationDate = new Date();
    //     }
    //     get token() {
    //         if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    //             return null;
    //         }
    //         else {
    //             return this._token;
    //         }
    //     }
    // }

    public class User
    {
        public string Email { get; set; }
        public string Id { get; set; }
        public string Token { get; set; }
        public DateTime? TokenExpirationDate { get; set; }
        public User()
        {
            this.Email = "notValid";
            this.Id = "notValid";
            this.Token = "notValid";
            TokenExpirationDate = null;
        }
    }
}
