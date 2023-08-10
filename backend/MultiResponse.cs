using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace My.MultiResponse
{
    public class MultiResponseFunction
    {
        private readonly ILogger _logger;

        public MultiResponseFunction(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<MultiResponse>();
        }

        [Function("MultiResponseFunction")]
        public MultiResponse Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
_logger.LogInformation("C# HTTP trigger function processed a request.");

            string? Azure_Storage_AccountName = System.Environment.GetEnvironmentVariable("Azure_Storage_AccountName", EnvironmentVariableTarget.Process);
            string? Azure_Storage_AccountKey = System.Environment.GetEnvironmentVariable("Azure_Storage_AccountKey", EnvironmentVariableTarget.Process);

            if (Azure_Storage_AccountName is not string || Azure_Storage_AccountKey is not string)
            {
                var badResponse = req.CreateResponse(HttpStatusCode.MethodNotAllowed);
                var badMessage = "Missing required app configuration";
                badResponse.WriteString(badMessage);
                return new MultiResponse()
                {
                    // Write a single message.
                    Messages = new string[] { badMessage },
                    HttpResponse = badResponse
                };
            }

            var message = "Welcome to Azure Functions!";

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString(message);

            // Return a response to both HTTP trigger and storage output binding.
            return new MultiResponse()
            {
                // Write a single message.
                Messages = new string[] { message },
                HttpResponse = response
            };
        }
    }

    
    public class MultiResponse
    {
        [QueueOutput("outqueue", Connection = "AzureWebJobsStorage")]
        public string[] Messages { get; set; }
        public HttpResponseData HttpResponse { get; set; }
    }
}
