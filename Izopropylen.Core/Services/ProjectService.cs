using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Izopropylen.Core.Dto;
using Izopropylen.Core.Interfaces;
using Izopropylen.Data.Entity;
using Izopropylen.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Izopropylen.Core.Services
{
    public class ProjectService: IProjectService
    {
        private readonly IRepository<Project> projectRepo;
        private readonly IAccountService accountService;

        public ProjectService(IRepository<Project> projectRepo,
            IAccountService accountService)
        {
            this.projectRepo = projectRepo;
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
                    Name = p .Name,
                    Role = p.Collaborators.First(c => c.AccountId == accountId).ProjectAccountRole
                })
                .ToListAsync();
        }

        public async Task<int> CreateProject(int accountId, string name)
        {
            var acc = await accountService.GetAccount(accountId);
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
    }
}
