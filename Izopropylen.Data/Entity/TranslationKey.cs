using System.Collections.Generic;

namespace Izopropylen.Data.Entity
{
    public class TranslationKey
    {
        public TranslationKey()
        {
            Values = new List<TranslationValue>();
        }

        public int Id { get; set; }

        public string Key { get; set; }

        public List<TranslationValue> Values { get; set; }

        public Project Project { get; set; }

        public int ProjectId { get; set; }
    }
}