using System.ComponentModel.DataAnnotations;

namespace Izopropylen.Api.Models.Input
{
    public class CreateAccountModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}