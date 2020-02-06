using System.Collections.Generic;
using System.Globalization;
using System.Linq;
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
    public class TranslationsController: ControllerBase
    {
        private readonly ITranslationService translationService;
        private readonly ISecurityService securityService;
        private readonly IMapper mapper;

        public TranslationsController(ITranslationService translationService,
            ISecurityService securityService,
            IMapper mapper)
        {
            this.translationService = translationService;
            this.securityService = securityService;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<int> Create(CreateKeyModel model)
        {
            await securityService.ThrowIfNoAccessToProjectWithMinimalRole(
                HttpContext.User.GetId(),
                model.ProjectId,
                ProjectAccountRole.Editor
            );

            return await translationService.CreateKey(model.ProjectId,
                model.Key);
        }

        [HttpPost("{keyId}/values/{cultureCode}")]
        [HttpPut("{keyId}/values/{cultureCode}")]
        public async Task<IActionResult> AddValue(int keyId, string cultureCode, AddValueModel model)
        {
            await securityService.ThrowIfNoAccessToTranslationWithMinimalRole(
                HttpContext.User.GetId(),
                keyId,
                ProjectAccountRole.Editor
            );
            var ci = new CultureInfo(cultureCode, false);
            var cultures = CultureInfo.GetCultures(CultureTypes.SpecificCultures);

            if (cultures.All(c => !c.Equals(ci)))
            {
                return BadRequest("Invalid culture code");
            }

            await translationService.UpsertValue(keyId, ci, model.Value);
            return Ok();
        }

        [HttpGet("{keyId}/values")]
        public async Task<IEnumerable<TranslationValueModel>> GetValues(int keyId)
        {
            await securityService.ThrowIfNoAccessToTranslationWithMinimalRole(
                HttpContext.User.GetId(),
                keyId,
                ProjectAccountRole.Viewer
            );

            var values = await translationService.GetValues(keyId);

            return mapper.Map<IEnumerable<TranslationValueModel>>(values);
        }
    }
}
