using System;

namespace Izopropylen.Api.Models.Output
{
    public class AccountsJwtToken
    {
        public string Token { get; set; }

        public DateTime Expires { get; set; }
    }
}