using Izopropylen.Data.Entity;

namespace Izopropylen.Core.Dto
{
    public class ProjectMembershipDto
    {
        public int ProjectId { get; set; }

        public string Name { get; set; }

        public ProjectAccountRole Role { get; set; }
    }
}
