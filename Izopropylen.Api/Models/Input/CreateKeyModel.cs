using System.ComponentModel.DataAnnotations;

namespace Izopropylen.Api.Models.Input
{
    public class CreateKeyModel
    {
        [Required]
        public int ProjectId { get; set; }

        [Required]
        public string Key { get; set; }
    }
}
