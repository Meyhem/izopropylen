using System.Linq;
using System.Threading.Tasks;
using Izopropylen.Core.Interfaces;
using Izopropylen.Data.Entity;
using Izopropylen.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Izopropylen.Core.Services
{
    public class AccountService : IAccountService
    {
        private readonly IRepository<Account> accRepo;

        public AccountService(IRepository<Account> accRepo)
        {
            this.accRepo = accRepo;
        }

        public async Task AddAccount(string username, string passwordHash)
        {

        }
    }
}