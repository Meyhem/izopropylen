using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Izopropylen.Api.Models.Input;
using Izopropylen.Core.Interfaces;
using Izopropylen.Api.Filters;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Izopropylen.Api.Extensions;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using Izopropylen.Api.Models.Output;
using Microsoft.IdentityModel.Logging;

namespace Izopropylen.Api.Controllers
{
    [ApiExceptionFilter]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService accService;
        private readonly ApplicationSettings settings;

        public AccountsController(IAccountService accService, ApplicationSettings settings)
        {
            this.accService = accService;
            this.settings = settings;
        }


        [HttpPost("token")]
        public async Task<AccountsJwtToken> Token(IssueTokenModel model)
        {
            var user = await accService.AutheticateUser(model.Username, model.Password);

            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(settings.JwtKey);

            var expires = DateTime.Now.AddSeconds(settings.JwtExpires);
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = expires,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = handler.CreateToken(descriptor);

            return new AccountsJwtToken
            {
                Token = handler.WriteToken(token),
                Expires = expires
            };
        }

        [HttpPost]
        public async Task<int> Create(CreateAccountModel model)
        {
            return await accService.AddAccount(model.Username, model.Password);

        }
    }
}