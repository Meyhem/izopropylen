using System.Threading.Tasks;
using Izopropylen.Api.Extensions;
using Izopropylen.Api.Filters;
using Izopropylen.Api.Models.Input;
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

        public TranslationsController(ITranslationService translationService,
            ISecurityService securityService)
        {
            this.translationService = translationService;
            this.securityService = securityService;
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
    }
}
