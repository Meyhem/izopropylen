using System.Threading.Tasks;
using Izopropylen.Data.Entity;

namespace Izopropylen.Core.Interfaces
{
    public interface ISecurityService
    {
        Task<bool> HasAccessToProjectWithMinimalRole(int accountId, int projectId, ProjectAccountRole role);
        Task<bool> HasAccessToTranslationWithMinimalRole(int accountId, int translationKeyId, ProjectAccountRole role);
        bool HasMinimalRole(AccountProject ap, ProjectAccountRole role);
        Task ThrowIfNoAccessToProjectWithMinimalRole(int accountId, int projectId, ProjectAccountRole role);
        Task ThrowIfNoAccessToTranslationWithMinimalRole(int accountId, int translationKeyId, ProjectAccountRole role);
    }
}