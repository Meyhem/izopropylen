using System;

namespace Izopropylen.Api
{
    public class ApplicationSettings
    {
        public string JwtKey { get; set; }

        public int JwtExpires { get; set; }

        public void ValidateAndFallback()
        {
            if (string.IsNullOrEmpty(JwtKey))
            {
                throw new ArgumentException($"Settings.{nameof(JwtKey)} null");
            }

            if (JwtKey.Length < 16)
            {
                throw new ArgumentException($"Settings.{nameof(JwtKey)} must be at least 16 chars");
            }

            if (JwtExpires == 0)
            {
                JwtExpires = 3600;
            }
        }
    }
}