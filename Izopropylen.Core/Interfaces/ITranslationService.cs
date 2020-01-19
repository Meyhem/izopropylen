using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Izopropylen.Core.Dto;

namespace Izopropylen.Core.Interfaces
{
    public interface ITranslationService
    {
        Task<int> CreateKey(int projectId, string key);
        Task<IEnumerable<TranslationKeyDto>> GetProjectKeys(int projectId);
    }
}
