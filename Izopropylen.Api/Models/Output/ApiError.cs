namespace Izopropylen.Api.Models.Output
{
    public class ApiError
    {
        public string TraceId { get; set; }

        public string Message { get; set; }

        public string Detail { get; set; }
    }
}