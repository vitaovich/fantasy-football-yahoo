using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace My.SasFunction
{
    public class GenerateSasUrlFunction
    {
        private readonly ILogger _logger;

        public GenerateSasUrlFunction(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<GenerateSasUrlFunction>();
        }

        [Function("GenerateSasUrlFunction")]
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["name"];
            string fileName = req.Query["filename"];
            string containerName = req.Query["containername"];
            string permissions = req.Query["permission"];
            string timerange = req.Query["timerange"];

            string requestBody = String.Empty;
            using (StreamReader streamReader =  new  StreamReader(req.Body))
            {
                requestBody = streamReader.ReadToEnd();
            }
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            
            name = name ?? data?.name;
            fileName = fileName ?? data?.fileName;
            containerName = containerName ?? data?.containerName;
            permissions = permissions ?? data?.permission;
            timerange = timerange ?? data?.timerange;

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            response.WriteString($"SAS token for: name-{name}, fileName-{fileName}, containerName-{containerName}, permissions-{permissions}, timerange-{timerange}");

            return response;
        }
    }
}
