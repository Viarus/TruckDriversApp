using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TruckCalculatorAppAPI.Models;
using TruckCalculatorAppAPI.Repository.IRepository;

namespace TruckCalculatorAppAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        public User Authenticate(string name, string password)
        {
            throw new NotImplementedException();
        }

        public bool IsUniqueUser(string name)
        {
            throw new NotImplementedException();
        }

        public User Register(string name, string password)
        {
            throw new NotImplementedException();
        }
    }
}
