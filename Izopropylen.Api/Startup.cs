using Izopropylen.Data;
using Izopropylen.Data.Entity;
using Izopropylen.Data.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
            services.AddControllers();
            services.AddDbContext<IzoDbContext>();
            services.AddTransient<IRepository<Account>, IzoRepository<Account>>();
            services.AddTransient<IRepository<AccountProject>, IzoRepository<AccountProject>>();
            services.AddTransient<IRepository<Project>, IzoRepository<Project>>();
            services.AddTransient<IRepository<TranslationKey>, IzoRepository<TranslationKey>>();
            services.AddTransient<IRepository<TranslationValue>, IzoRepository<TranslationValue>>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
