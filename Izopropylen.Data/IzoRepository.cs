using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Izopropylen.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Izopropylen.Data
{
    public class IzoRepository<T> : IRepository<T> where T: class
    {
        private readonly IzoDbContext db;

        public IzoRepository(IzoDbContext db)
        {
            this.db = db;
        }

        public async Task<T> FindOne(object id)
        {
            return await db.FindAsync<T>(id);
        }

        public IDbQueryable<T> Query()
        {
            return (IDbQueryable<T>)db.Set<T>();
        }

        public async Task Create(T ent)
        {
            await db.AddAsync(ent);
            await db.SaveChangesAsync();
        }

        public async Task CreateMany(IEnumerable<T> ents)
        {
            db.AddRange(ents);
            await db.SaveChangesAsync();
        }

        public async Task Delete(T ent)
        {
            db.Remove(ent);
            await db.SaveChangesAsync();
        }

        public async Task DeleteMany(IEnumerable<T> ents)
        {
            db.RemoveRange(ents);
            await db.SaveChangesAsync();
        }

        public async Task Update(T ent)
        {
            db.Update(ent);
            await db.SaveChangesAsync();
        }

        public async Task UpdateMany(IEnumerable<T> ents)
        {
            db.UpdateRange(ents);
            await db.SaveChangesAsync();
        }
    }
}