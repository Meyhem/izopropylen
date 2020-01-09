using System.Collections.Generic;

namespace Izopropylen.Data.Entity
{
    public enum ProjectAccountRole
    {
        Admin,
        Editor,
        Viewer
    }

    public class AccountProject
    {
        public int AccountId { get; set; }

        public int ProjectId { get; set; }

        public ProjectAccountRole ProjectAccountRole { get; set; }

        public Account Account { get; set; }

        public Project Project { get; set; }
    }
}