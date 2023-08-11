using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace My.CosmosDBFunction
{
    public class HttpTriggerCosmosDB
    {
        private readonly ILogger _logger;

        public HttpTriggerCosmosDB(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<HttpTriggerCosmosDB>();
        }

        [Function("HttpTriggerCosmosDB")]
        public MultiResponse Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            string guid = System.Guid.NewGuid().ToString();
            string defGuid = System.Guid.NewGuid().ToString();
            _logger.LogInformation($"GUID Generated:{guid}");

            string name = req.Query["name"];
            string requestBody = new StreamReader(req.Body).ReadToEnd();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            var message = $"Welcome to Azure Functions {name}!";

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
            response.WriteString(message);

            // Return a response to both HTTP trigger and Azure Cosmos DB output binding.
            return new MultiResponse()
            {
                Document = new MyDocument
                {
                    id = guid,
                    definition = new Definition
                    {
                        id = defGuid,
                        name = name,
                        message = message
                    }
                },
                HttpResponse = response
            };
        }
    }

    public class MultiResponse
    {
        [CosmosDBOutput("cosmos-db-free-tier-grubworm-cosmosdb-sqldb", "cosmos-db-free-tier-grubworm-sql-container",
            Connection = "COSMOS_ENDPOINT", CreateIfNotExists = true)]
        public MyDocument Document { get; set; }
        public HttpResponseData HttpResponse { get; set; }
    }
    public class MyDocument
    {
        public string id { get; set; }
        public Definition definition { get; set; }
    }
    
    public class Definition
    {
        public string id { get; set; }
        public string name { get; set; }
        public string message { get; set; }
    }
}
