using System.Collections.Generic;

namespace Izopropylen.Data.Entity
{
    public class Account
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Displayname { get; set; }

        public string PasswordHash { get; set; }

        public List<AccountProject> Projects { get; set; }
    }
}