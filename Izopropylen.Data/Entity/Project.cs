using System.Collections.Generic;

namespace Izopropylen.Data.Entity
{
    public class Project
    {
        public Project()
        {
            Collaborators = new List<AccountProject>();
            TranslationKeys = new List<TranslationKey>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public List<AccountProject> Collaborators { get; set; }

        public List<TranslationKey> TranslationKeys { get; set; }
    }
}