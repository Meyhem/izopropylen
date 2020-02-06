using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Izopropylen.Core.Dto;

namespace Izopropylen.Core.Interfaces
{
    public interface ITranslationService
    {
        Task<int> CreateKey(int projectId, string key);
        Task<IEnumerable<string>> GetProjectCultureCodes(int projectId);
        Task<IEnumerable<TranslationKeyDto>> GetProjectKeys(int projectId);
        Task<IEnumerable<TranslationValueDto>> GetValues(int translationKeyId);
        Task<IEnumerable<TranslationValueDto>> GetValuesByCode(int projectId, string cultureCode);
        Task UpsertValue(int keyId, CultureInfo cultureInfo, string value);
    }
}
