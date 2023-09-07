using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using FantasyFootball.Models;
using Newtonsoft.Json;

namespace Vantasy.Vootball
{
    public class LeaguesGet
    {
        private readonly ILogger _logger;

        public LeaguesGet(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<LeaguesGet>();
        }

        [Function("LeaguesGet")]
        public HttpResponseData Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get",
                Route = "leagues/get/{partitionKey}/{id}")] HttpRequestData req,
            [CosmosDBInput(
                databaseName: "vitaovich-cosmosdb-sqldb",
                collectionName: "fantasyfootball-sql-container",
                ConnectionStringSetting = "COSMOS_ENDPOINT",
                Id = "{id}",
                PartitionKey = "{partitionKey}")]LeagueDocument league,
            string id
            )
        {
            _logger.LogInformation("C# HTTP trigger function LeaguesGet processed a request.");
            var response = req.CreateResponse(HttpStatusCode.OK);
            if (league == null)
            {
                _logger.LogInformation($"League item not found will insert new record");
            }
            else
            {
                _logger.LogInformation($"Found League item, id={league.id}");
                response.WriteAsJsonAsync(JsonConvert.SerializeObject(league));
            }

            return response;
        }
    }
}
