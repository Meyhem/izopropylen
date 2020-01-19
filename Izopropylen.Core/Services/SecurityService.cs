using System;
using System.Linq;
using System.Threading.Tasks;
using Izopropylen.Core.Exceptions;
using Izopropylen.Core.Interfaces;
using Izopropylen.Data.Entity;
using Izopropylen.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Izopropylen.Core.Services
{
    public class SecurityService: ISecurityService
    {
        private readonly IRepository<AccountProject> accountProjectRepository;

        public SecurityService(IRepository<AccountProject> accountProjectRepository)
        {
            this.accountProjectRepository = accountProjectRepository;
        }

        public async Task<bool> HasAccessToProjectWithMinimalRole(
            int accountId,
            int projectId,
            ProjectAccountRole role)
        {
            var ap = await accountProjectRepository
                .Query()
                .SingleOrDefaultAsync(ap =>
                    ap.AccountId == accountId &&
                    ap.ProjectId == projectId);

            return HasMinimalRole(ap, role);
        }

        public async Task ThrowIfNoAccessToProjectWithMinimalRole(int accountId,
            int projectId,
            ProjectAccountRole role)
        {
            if (!await HasAccessToProjectWithMinimalRole(accountId, projectId, role))
            {
                throw new IzoNoAccessException(
                    $"Account={accountId} cannot access project={projectId} with role {role}"
                );
            }
        }

        public bool HasMinimalRole(AccountProject ap, ProjectAccountRole role)
        {
            if (ap == null) return false;

            var r = ap.ProjectAccountRole;

            return role switch
            {
                ProjectAccountRole.Admin => r == ProjectAccountRole.Admin,
                ProjectAccountRole.Editor => r == ProjectAccountRole.Admin || r == ProjectAccountRole.Editor,
                ProjectAccountRole.Viewer => true,
                _ => false,
            };
        }

    }
}
