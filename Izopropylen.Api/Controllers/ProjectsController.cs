using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Izopropylen.Api.Extensions;
using Izopropylen.Api.Filters;
using Izopropylen.Api.Models.Input;
using Izopropylen.Api.Models.Output;
using Izopropylen.Core.Interfaces;
using Izopropylen.Data.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Izopropylen.Api.Controllers
{
    [ApiExceptionFilter]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService projectService;
        private readonly ISecurityService securityService;
        private readonly ITranslationService translationService;
        private readonly IMapper mapper;

        public ProjectsController(IProjectService projectService,
            ISecurityService securityService,
            ITranslationService translationService,
            IMapper mapper)
        {
            this.projectService = projectService;
            this.securityService = securityService;
            this.translationService = translationService;
            this.mapper = mapper;
        }

        [HttpGet("me")]
        public async Task<IEnumerable<ProjectMembershipModel>> GetSelf()
        {
            var memberships = await projectService
                .GetProjectsByAccountId(HttpContext.User.GetId());

            return mapper.Map<IEnumerable<ProjectMembershipModel>>(memberships);
        }

        [HttpPost]
        public async Task<int> Create(CreateProjectModel model)
        {
            return await projectService.CreateProject(HttpContext.User.GetId(), model.Name);
        }

        [HttpGet("{id}/collaborators")]
        public async Task<IEnumerable<CollaboratorModel>> GetCollaborators(int id)
        {
            await securityService.ThrowIfNoAccessToProjectWithMinimalRole(
                HttpContext.User.GetId(),
                id,
                ProjectAccountRole.Viewer
            );

            var collabs = await projectService.GetCollaborators(id);

            return mapper.Map<IEnumerable<CollaboratorModel>>(collabs);
        }

        [HttpGet("{id}/keys")]
        public async Task<IEnumerable<TranslationKeyModel>> GetKeys(int id)
        {
            await securityService.ThrowIfNoAccessToProjectWithMinimalRole(
                            HttpContext.User.GetId(),
                            id,
                            ProjectAccountRole.Viewer
                        );

            var keys = await translationService.GetProjectKeys(id);

            return mapper.Map<IEnumerable<TranslationKeyModel>>(keys);
        }
    }
}
