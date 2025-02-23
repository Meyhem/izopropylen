using System;
using Izopropylen.Api.Models.Output;
using Izopropylen.Core.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Izopropylen.Api.Filters
{
    public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var code = 500;
            var ex = context.Exception;
            var apiErr = new ApiError
            {
                TraceId = Guid.NewGuid().ToString(),
                Message = ex.Message,
                Detail = ex.StackTrace
            };

            switch(ex)
            {
                case IzoConflictException _:
                    code = 409;
                    break;
                case IzoNotFoundException _:
                    code = 404;
                    break;
                case IzoNoAccessException _:
                    code = 401;
                    break;
                default:
                    break;
            }

            context.HttpContext.Response.StatusCode = code;
            context.Result = new ObjectResult(apiErr);

            base.OnException(context);
        }
    }
}