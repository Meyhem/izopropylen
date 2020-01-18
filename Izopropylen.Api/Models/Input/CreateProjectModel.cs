using System;
using System.ComponentModel.DataAnnotations;

namespace Izopropylen.Api.Models.Input
{
    public class CreateProjectModel
    {
        [Required]
        public string Name { get; set; }
    }
}
