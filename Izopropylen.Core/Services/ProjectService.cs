using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Izopropylen.Core.Dto;
using Izopropylen.Core.Exceptions;
using Izopropylen.Core.Interfaces;
using Izopropylen.Data.Entity;
using Izopropylen.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Izopropylen.Core.Services
{
    public class ProjectService: IProjectService
    {
        private readonly IRepository<Project> projectRepo;
        private readonly IRepository<AccountProject> accountProjectRepo;
        private readonly IAccountService accountService;

        public ProjectService(IRepository<Project> projectRepo,
            IRepository<AccountProject> accountProjectRepo,
            IAccountService accountService)
        {
            this.projectRepo = projectRepo;
            this.accountProjectRepo = accountProjectRepo;
            this.accountService = accountService;
        }

        public async Task<IEnumerable<ProjectMembershipDto>>
            GetProjectsByAccountId(int accountId)
        {
            return await projectRepo.Query()
                .Include(i => i.Collaborators)
                .Where(p => p.Collaborators.Any(a => a.AccountId == accountId))
                .Select(p => new ProjectMembershipDto
                {
                    ProjectId = p.Id,
                    Name = p.Name,
                    Role = p.Collaborators.First(c => c.AccountId == accountId).ProjectAccountRole
                })
                .ToListAsync();
        }

        public async Task<int> CreateProject(int accountId, string name)
        {
            var acc = await accountService.GetAccount(accountId);

            if (acc == null)
            {
                throw new IzoNotFoundException("No such account");
            }

            var newProject = new Project
            {
                Name = name
            };
            newProject.Collaborators.Add(new AccountProject
            {
                Account = acc,
                ProjectAccountRole = ProjectAccountRole.Admin
            });

            await projectRepo.Create(newProject);

            return newProject.Id;
        }

        public async Task<IEnumerable<CollaboratorDto>> GetCollaborators(int projectId)
        {
            return await accountProjectRepo.Query()
                .Include(ap => ap.Account)
                .Where(ap => ap.ProjectId == projectId)
                .Select(c => new CollaboratorDto
                {
                    AccountId = c.AccountId,
                    Displayname = c.Account.Displayname,
                    Role = c.ProjectAccountRole
                })
                .ToListAsync();
        }

        public async Task<Project> GetProject(int projectId)
        {
            var project = await projectRepo.FindOne(projectId);

            if (project == null)
            {
                throw new IzoNotFoundException("No such project");
            }

            return project;
        }
    }
}
