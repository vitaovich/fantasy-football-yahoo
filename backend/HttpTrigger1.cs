using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace My.Function
{
    public class HttpTrigger1
    {
        private readonly ILogger _logger;

        public HttpTrigger1(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<HttpTrigger1>();
        }

        [Function("HttpTrigger1")]
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            
            string? Azure_Storage_AccountName = System.Environment.GetEnvironmentVariable("Azure_Storage_AccountName", EnvironmentVariableTarget.Process);
            string? Azure_Storage_AccountKey = System.Environment.GetEnvironmentVariable("Azure_Storage_AccountKey", EnvironmentVariableTarget.Process);
            
            if(Azure_Storage_AccountName is not string || Azure_Storage_AccountKey is not string) 
            {
                var badResponse = req.CreateResponse(HttpStatusCode.MethodNotAllowed);
                badResponse.WriteString("Missing required app configuration");
                return badResponse;
            }

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString("Welcome to Azure Functions!");

            return response;
        }
    }
}
