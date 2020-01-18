using System.Collections.Generic;
using System.Threading.Tasks;
using Izopropylen.Core.Dto;

namespace Izopropylen.Core.Interfaces
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectMembershipDto>> GetProjectsByAccountId(int accountId);
    }
}
