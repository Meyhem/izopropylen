using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Izopropylen.Core.Dto;
using Izopropylen.Core.Exceptions;
using Izopropylen.Core.Interfaces;
using Izopropylen.Data.Entity;
using Izopropylen.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Izopropylen.Core.Services
{
    public class TranslationService: ITranslationService
    {
        private readonly IRepository<TranslationKey> keyRepository;
        private readonly IRepository<TranslationValue> valueRepository;

        public TranslationService(IRepository<TranslationKey> keyRepository,
            IRepository<TranslationValue> valueRepository)
        {
            this.keyRepository = keyRepository;
            this.valueRepository = valueRepository;
        }

        public async Task<IEnumerable<TranslationKeyDto>> GetProjectKeys(int projectId)
        {
            return await keyRepository.Query()
                .Where(k => k.ProjectId == projectId)
                .Select(k => new TranslationKeyDto
                {
                    TranslationKeyId = k.Id,
                    Key = k.Key
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<string>> GetProjectCultureCodes(int projectId)
        {
            return await keyRepository
                .Query()
                .Where(k => k.ProjectId == projectId)
                .SelectMany(k => k.Values.Select(v => v.CultureCode).Distinct())
                .ToListAsync();
        }

        public async Task<int> CreateKey(int projectId, string key)
        {
            var existing = await keyRepository.Query()
                .AnyAsync(k => k.ProjectId == projectId && k.Key == key);

            if (existing)
            {
                throw new IzoConflictException(
                    $"Key '{key}' already exists in project {projectId}"
                );
            }

            var newKey = new TranslationKey
            {
                ProjectId = projectId,
                Key = key
            };

            await keyRepository.Create(newKey);

            return newKey.Id;
        }

        public async Task UpsertValue(int keyId, CultureInfo cultureInfo, string value)
        {
            var cc = cultureInfo.TextInfo.CultureName;
            var tv = await valueRepository
                .Query()
                .SingleOrDefaultAsync(v =>
                    v.TranslationKeyId == keyId &&
                    v.CultureCode == cc);

            if (tv == null)
            {
                tv = new TranslationValue
                {
                    TranslationKeyId = keyId,
                    CultureCode = cc
                };

                await valueRepository.Create(tv);
            }

            tv.Value = value;

            await valueRepository.Update(tv);
        }

        public async Task<IEnumerable<TranslationValueDto>> GetValues(int translationKeyId)
        {
            return await valueRepository.Query()
                .Where(v => v.TranslationKeyId == translationKeyId)
                .Select(v => new TranslationValueDto
                {
                    TranslationKeyId = v.TranslationKeyId,

                    TranslationValueId = v.Id,

                    CultureCode = v.CultureCode,

                    Value = v.Value
                })
                .ToListAsync();
        }
    }
}
