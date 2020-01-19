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
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace Izopropylen.Api.Controllers
{
    [ApiExceptionFilter]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService accService;
        private readonly ApplicationSettings settings;
        private readonly IMapper mapper;

        public AccountsController(
            IAccountService accService,
            ApplicationSettings settings,
            IMapper mapper)
        {
            this.accService = accService;
            this.settings = settings;
            this.mapper = mapper;
        }

        [HttpPost("token")]
        public async Task<AccountsJwtTokenModel> Token(IssueTokenModel model)
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

            return new AccountsJwtTokenModel
            {
                Token = handler.WriteToken(token),
                Expires = expires
            };
        }

        [HttpPost]
        public async Task<int> Create(CreateAccountModel model)
        {
            return await accService.AddAccount(model.Username,
                model.Password,
                model.Displayname);
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<AccountModel> GetSelf()
        {
            var acc = await accService.GetAccount(HttpContext.User.GetId());
            return mapper.Map<AccountModel>(acc);
        }
    }
}