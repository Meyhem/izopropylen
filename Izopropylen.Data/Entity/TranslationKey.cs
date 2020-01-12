using System.Collections.Generic;
using Izopropylen.Data.Interfaces;

namespace Izopropylen.Data.Entity
{
    public class TranslationKey
    {
        public int Id { get; set; }

        public string CultureCode { get; set; }

        public string Key { get; set; }

        public List<TranslationValue> Values { get; set; }

        public Project Project { get; set; }

        public int ProjectId { get; set; }
    }
}