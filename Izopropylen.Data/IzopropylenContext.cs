using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Izopropylen.Data
{
    public class IzopropylenDbContext : DbContext
    {
        private IConfiguration configuration;

        public DbSet<Account> Accounts { get; set; }

        public IzopropylenDbContext(DbContextOptions<IzopropylenDbContext> opts, IConfiguration configuration)
            : base(opts)
        {
            this.configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlite(configuration.GetConnectionString("DefaultConnectionString"));

            base.OnConfiguring(builder);
        }
    }
}