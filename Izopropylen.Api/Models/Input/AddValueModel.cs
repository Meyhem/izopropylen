using System.ComponentModel.DataAnnotations;

namespace Izopropylen.Api.Models.Input
{
    public class AddValueModel
    {
        [Required]
        public string Value { get; set; }
    }
}
