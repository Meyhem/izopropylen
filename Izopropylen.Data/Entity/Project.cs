using System.Collections.Generic;

namespace Izopropylen.Data.Entity
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<AccountProject> Collaborators { get; set; }
    }
}