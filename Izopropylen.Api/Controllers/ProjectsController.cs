using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Izopropylen.Api.Extensions;
using Izopropylen.Api.Filters;
using Izopropylen.Api.Models.Input;
using Izopropylen.Api.Models.Output;
using Izopropylen.Core.Interfaces;
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
        private readonly IMapper mapper;

        public ProjectsController(IProjectService projectService, IMapper mapper)
        {
            this.projectService = projectService;
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
    }

}
