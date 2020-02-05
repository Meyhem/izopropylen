using System.Collections.Generic;

namespace Izopropylen.Api.Models.Output
{
    public class ProjectDetail
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<string> CultureCodes { get; set; }

        public IEnumerable<TranslationKeyModel> TranslationKeys { get; set; }
    }
}
