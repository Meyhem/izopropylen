using System.Security.Claims;

namespace Izopropylen.Api.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetId(this ClaimsPrincipal self)
        {
            var claimVal = self.FindFirstValue(ClaimTypes.Name);

            return int.Parse(claimVal);
        }
    }
}
