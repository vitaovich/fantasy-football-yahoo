using System.Net;
using FantasyFootbal.Models;
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
            string defGuid = "yahoo-" + System.Guid.NewGuid().ToString();
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
                LeagueDocument = new LeagueDocument
                {
                    id = guid,
                    League = new League
                    {
                        id = defGuid,
                        name = name,
                        message = message,
                        Teams = new()
                    }
                },
                HttpResponse = response
            };
        }
    }

    public class MultiResponse
    {
        [CosmosDBOutput("vitaovich-cosmosdb-sqldb", "fantasyfootball-sql-container",
            Connection = "COSMOS_ENDPOINT", CreateIfNotExists = true)]
        public LeagueDocument LeagueDocument { get; set; }
        public HttpResponseData HttpResponse { get; set; }
    }
}
