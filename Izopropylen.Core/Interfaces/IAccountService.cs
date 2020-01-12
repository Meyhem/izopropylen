using System.Threading.Tasks;
using Izopropylen.Data.Entity;

namespace Izopropylen.Core.Interfaces
{
    public interface IAccountService
    {
        Task<int> AddAccount(string username, string passwordHash);
        Task<Account> AutheticateUser(string username, string password);
    }
}