namespace Izopropylen.Data.Entity
{
    public class TranslationValue
    {
        public int Id { get; set; }

        public string Value { get; set; }

        public TranslationKey TranslationKey { get; set; }

        public int TranslationKeyId { get; set; }
    }
}