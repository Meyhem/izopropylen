using System.Reflection;
using System.Text;
using AutoMapper;
using Izopropylen.Api.Extensions;
using Izopropylen.Api.Filters;
using Izopropylen.Core.Interfaces;
using Izopropylen.Core.Services;
using Izopropylen.Data;
using Izopropylen.Data.Entity;
using Izopropylen.Data.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Izopropylen.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var settings = Configuration.GetSettings();
            settings.ValidateAndFallback();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Izopropylen API",
                    Version = "V1"
                });
            });
            services.AddControllers(c =>
            {
                c.Filters.Add(typeof(ApiExceptionFilterAttribute));
            });

            services.AddCors(o =>
                o.AddDefaultPolicy(b =>
                    b.AllowAnyHeader()
                        .AllowAnyMethod()
                        .SetIsOriginAllowed(_ => true)
                        .AllowCredentials()
                )
            );
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddDbContext<IzoDbContext>();
            services.AddTransient<IRepository<Account>, IzoRepository<Account>>();
            services.AddTransient<IRepository<AccountProject>, IzoRepository<AccountProject>>();
            services.AddTransient<IRepository<Project>, IzoRepository<Project>>();
            services.AddTransient<IRepository<TranslationKey>, IzoRepository<TranslationKey>>();
            services.AddTransient<IRepository<TranslationValue>, IzoRepository<TranslationValue>>();
            services.AddSingleton(r => settings);

            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IProjectService, ProjectService>();
            services.AddTransient<ISecurityService, SecurityService>();
            services.AddTransient<ITranslationService, TranslationService>();

            services.AddAuthentication(a =>
            {
                a.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                a.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(b =>
            {
                b.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.JwtKey))
                };
            });
        }

        public void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors();
            app.UseRouting();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Izopropylen API v1");
            });
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
