using System.Net;
using FantasyFootbal.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using My.CosmosDBFunction;

namespace My.Function
{
    public class HttpTrigCosmosDBGet
    {
        private readonly ILogger _logger;

        public HttpTrigCosmosDBGet(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<HttpTrigCosmosDBGet>();
        }

        [Function("HttpTrigCosmosDBGet")]
        public HttpResponseData Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestData req,
            [CosmosDBInput(
                databaseName: "vitaovich-cosmosdb-sqldb",
                containerName: "fantasyfootball-sql-container",
                Connection = "COSMOS_ENDPOINT",
                Id = "{Query.id}",
                PartitionKey = "{Query.partitionKey}")]LeagueDocument leagueDocument
            )
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
            if (leagueDocument == null)
            {
                _logger.LogInformation($"ToDo item not found");
                response.WriteString($"Did not find record with id:{req.Query["id"]}, partitionKey:{req.Query["partitionKey"]}");
            }
            else
            {
                _logger.LogInformation($"Found ToDo item, Description={leagueDocument.League.message}");
                response.WriteString($"Found record with message:{leagueDocument.League.message}");
            }

            return response;
        }
    }
}
