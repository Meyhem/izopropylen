using System.Threading.Tasks;

namespace Izopropylen.Core.Interfaces
{
    public interface IAccountService
    {
        Task AddAccount(string username, string passwordHash);
    }
}