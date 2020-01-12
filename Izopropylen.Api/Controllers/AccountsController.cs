using Izopropylen.Api.Models.Input.Output;
using Microsoft.AspNetCore.Mvc;

namespace Izopropylen.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        [Route("token")]
        public IssueTokenModel Token(IssueTokenModel model) {
            return model;
        }
    }
}