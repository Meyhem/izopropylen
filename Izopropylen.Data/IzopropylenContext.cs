using Izopropylen.Data.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Izopropylen.Data
{
    public class IzopropylenDbContext : DbContext
    {
        private IConfiguration configuration;

        public DbSet<Account> Accounts { get; set; }
        public DbSet<AccountProject> AccountProjects { get; set; }
        public DbSet<Project> Projects { get; set; }

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .HasMany(a => a.Projects)
                .WithOne(ap => ap.Account);

            modelBuilder.Entity<Account>()
                .HasIndex(i => i.Username)
                .IsUnique();

            modelBuilder.Entity<Project>()
                .HasMany(p => p.Collaborators)
                .WithOne(ap => ap.Project);

            modelBuilder.Entity<AccountProject>()
                .HasKey(ap => new { ap.AccountId, ap.ProjectId });
        }
    }
}