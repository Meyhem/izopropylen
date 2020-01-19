using System;
namespace Izopropylen.Api.Models.Output
{
    public class TranslationValueModel
    {
        public int TranslationKeyId { get; set; }

        public int TranslationValueId { get; set; }

        public string CultureCode { get; set; }

        public string Value { get; set; }
    }
}
