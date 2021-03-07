using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TruckCalculatorAppAPI.Models;

namespace TruckCalculatorAppAPI.Repository.IRepository
{
    interface IUserRepository
    {
        bool IsUniqueUser(string name);
        User Authenticate(string name, string password);
        User Register(string name, string password);
    }
}
