using System.Collections.Generic;
using System.Threading.Tasks;
using Izopropylen.Core.Dto;

namespace Izopropylen.Core.Interfaces
{
    public interface IProjectService
    {
        Task<int> CreateProject(int accountId, string name);
        Task<IEnumerable<ProjectMembershipDto>> GetProjectsByAccountId(int accountId);
    }
}
