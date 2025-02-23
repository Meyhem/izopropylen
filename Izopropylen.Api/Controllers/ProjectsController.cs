﻿using System.Collections.Generic;
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

        [HttpGet("{id}")]
        public async Task<ProjectDetail> GetDetail(int id)
        {
            await securityService.ThrowIfNoAccessToProjectWithMinimalRole(
                HttpContext.User.GetId(),
                id,
                ProjectAccountRole.Viewer
            );

            var keysTask = translationService.GetProjectKeys(id);
            var codesTask = translationService.GetProjectCultureCodes(id);
            var projectTask = projectService.GetProject(id);

            await Task.WhenAll(keysTask, codesTask, projectTask);

            var project = await projectTask;

            return new ProjectDetail
            {
                Id = project.Id,
                Name = project.Name,
                CultureCodes = await codesTask,
                TranslationKeys = mapper.Map<IEnumerable<TranslationKeyModel>>(await keysTask)
            };
        }

        [HttpGet("{projectId}/{cultureCode}")]
        public async Task<IEnumerable<TranslationValueModel>>
            GetTranslationsByCode(int projectId, string cultureCode)
        {
            await securityService.ThrowIfNoAccessToProjectWithMinimalRole(
               HttpContext.User.GetId(),
               projectId,
               ProjectAccountRole.Viewer
            );

            var values = await translationService.GetValuesByCode(projectId, cultureCode);

            return mapper.Map<IEnumerable<TranslationValueModel>>(values);
        }

        [HttpDelete("{projectId}/{cultureCode}")]
        public async Task
            DeleteCultureTranslations(int projectId, string cultureCode)
        {
            await securityService.ThrowIfNoAccessToProjectWithMinimalRole(
               HttpContext.User.GetId(),
               projectId,
               ProjectAccountRole.Editor
            );

            await translationService.DeleteProjectCulture(projectId, cultureCode);
        }
    }
}
