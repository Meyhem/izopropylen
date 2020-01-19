using System;
namespace Izopropylen.Core.Dto
{
    public class TranslationValueDto
    {
        public int TranslationKeyId { get; set; }

        public int TranslationValueId { get; set; }

        public string CultureCode { get; set; }

        public string Value { get; set; }
    }
}
