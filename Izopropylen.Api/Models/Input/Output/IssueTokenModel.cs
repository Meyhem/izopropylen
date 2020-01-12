using System.ComponentModel.DataAnnotations;

namespace Izopropylen.Api.Models.Input.Output
{
    public class IssueTokenModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}