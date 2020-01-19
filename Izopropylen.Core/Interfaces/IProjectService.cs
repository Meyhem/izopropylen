using System.Collections.Generic;
using System.Threading.Tasks;
using Izopropylen.Core.Dto;
using Izopropylen.Data.Entity;

namespace Izopropylen.Core.Interfaces
{
    public interface IProjectService
    {
        Task<int> CreateProject(int accountId, string name);
        Task<IEnumerable<CollaboratorDto>> GetCollaborators(int projectId);
        Task<Project> GetProject(int projectId);
        Task<IEnumerable<ProjectMembershipDto>> GetProjectsByAccountId(int accountId);
    }
}
