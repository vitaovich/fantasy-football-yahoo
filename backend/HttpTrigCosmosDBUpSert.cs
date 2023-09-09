using System.Net;
using FantasyFootball.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace My.Function
{
    public class HttpTrigCosmosDBUpSert
    {
        private readonly ILogger _logger;

        public HttpTrigCosmosDBUpSert(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<HttpTrigCosmosDBUpSert>();
        }

        [Function("HttpTrigCosmosDBUpSert")]
        public MultiLeagueResponse Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", 
                Route = "fantasyleagues/{partitionKey}/{id}")] HttpRequestData req,
            [CosmosDBInput(
                databaseName: "vitaovich-cosmosdb-sqldb",
                collectionName: "fantasyfootball-sql-container",
                ConnectionStringSetting = "COSMOS_ENDPOINT",
                Id = "{id}",
                PartitionKey = "{partitionKey}")]LeagueDocument league
            )
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            string defGuid = "yahoo-" + System.Guid.NewGuid().ToString();

            string name = req.Query["name"];
            string requestBody = new StreamReader(req.Body).ReadToEnd();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            var message = $"Welcome to Azure Functions {name} at {DateTime.Now}!";

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");


            if (league == null)
            {
                _logger.LogInformation($"League item not found will insert new record");
                league = new LeagueDocument
                {
                    id = defGuid,
                    League = new League 
                    {
                        LeagueType = LeagueType.Yahoo,
                        Year = "2023",
                        name = name,
                        message = message,
                        Teams = new()
                    }

                };
                // response.WriteString($"Did not find record with id:{req.Query["id"]}, partitionKey:{req.Query["partitionKey"]}");
            }
            else
            {
                _logger.LogInformation($"Found ToDo item, Description={league.League.message}");
                response.WriteString($"Found record with message:{league.League.message}");
                league.League.message = $"Welcome to Azure Functions {league.League.name} at {DateTime.Now}!";

            }

            return new MultiLeagueResponse()
            {
                LeagueDocument = league,
                HttpResponse = response
            };
        }
    }

    public class MultiLeagueResponse
    {
        [CosmosDBOutput("vitaovich-cosmosdb-sqldb", "fantasyfootball-sql-container",
            ConnectionStringSetting = "COSMOS_ENDPOINT", CreateIfNotExists = true)]
        public LeagueDocument LeagueDocument { get; set; }
        public HttpResponseData HttpResponse { get; set; }
    }
}
