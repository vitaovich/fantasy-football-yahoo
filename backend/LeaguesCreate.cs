using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using FantasyFootball.Models;
using Newtonsoft.Json;

namespace Vantasy.Vootball
{
    public class LeaguesCreate
    {
        private readonly ILogger _logger;

        public LeaguesCreate(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<LeaguesGet>();
        }

        [Function("LeaguesCreate")]
        public MultiLeagueResponse Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post",
                Route = "leagues/create")] HttpRequestData req
            )
        {
            _logger.LogInformation("C# HTTP trigger function LeaguesCreate processed a request.");
            string? id = null;
            string? partitionKey = null;
            string requestBody = new StreamReader(req.Body).ReadToEnd();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            id = id ?? data?.id;
            partitionKey = partitionKey ?? data?.partitionKey;

            var response = req.CreateResponse(HttpStatusCode.OK);

            LeagueDocument leagueDoc =  new LeagueDocument
                {
                    id = id,
                    League = new League 
                    {
                        Year = partitionKey,
                        LeagueType = LeagueType.Yahoo,
                        CreatedOn = DateTime.UtcNow,
                        Teams = new()
                    }
                };

            return new MultiLeagueResponse {
                LeagueDocument = leagueDoc,
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
