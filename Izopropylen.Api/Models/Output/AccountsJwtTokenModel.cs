using System;

namespace Izopropylen.Api.Models.Output
{
    public class AccountsJwtTokenModel
    {
        public string Token { get; set; }

        public DateTime Expires { get; set; }
    }
}