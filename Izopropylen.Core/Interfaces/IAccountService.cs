using System.Threading.Tasks;
using Izopropylen.Data.Entity;

namespace Izopropylen.Core.Interfaces
{
    public interface IAccountService
    {
        Task<int> AddAccount(string username, string passwordHash, string displayname);
        Task<Account> AutheticateUser(string username, string password);
        Task<Account> GetAccount(int id);
    }
}