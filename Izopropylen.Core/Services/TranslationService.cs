using System.Collections.Generic;
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

        public TranslationService(IRepository<TranslationKey> keyRepository)
        {
            this.keyRepository = keyRepository;
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
    }
}
