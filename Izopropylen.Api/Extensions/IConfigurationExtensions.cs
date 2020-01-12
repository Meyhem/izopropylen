using Microsoft.Extensions.Configuration;

namespace Izopropylen.Api.Extensions
{
    public static class IConfigurationExtensions
    {
        public static ApplicationSettings GetSettings(this IConfiguration self)
        {
            var sec = self.GetSection("Settings");
            return sec.Get<ApplicationSettings>();
        }

    }
}