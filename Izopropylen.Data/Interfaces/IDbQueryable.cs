using System.Collections.Generic;
using System.Linq;

namespace Izopropylen.Data.Interfaces
{
    public interface IDbQueryable<T> : IQueryable<T>, IEnumerable<T>, IAsyncEnumerable<T> { }
}