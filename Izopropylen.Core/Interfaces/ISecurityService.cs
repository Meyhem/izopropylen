using System.Threading.Tasks;
using Izopropylen.Data.Entity;

namespace Izopropylen.Core.Interfaces
{
    public interface ISecurityService
    {
        Task<bool> HasAccessToProjectWithMinimalRole(int accountId, int projectId, ProjectAccountRole role);
        bool HasMinimalRole(AccountProject ap, ProjectAccountRole role);
        Task ThrowIfNoAccessToProjectWithMinimalRole(int accountId, int projectId, ProjectAccountRole role);
    }
}