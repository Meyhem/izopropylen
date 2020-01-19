using System;
using Izopropylen.Data.Entity;

namespace Izopropylen.Core.Dto
{
    public class CollaboratorDto
    {
        public int AccountId { get; set; }

        public string Displayname { get; set; }

        public ProjectAccountRole Role { get; set; }
    }
}
