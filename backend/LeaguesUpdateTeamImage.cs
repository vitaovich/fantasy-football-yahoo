using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using FantasyFootball.Models;
using Newtonsoft.Json;
using Azure.Storage.Sas;
using Azure.Storage.Blobs;
using Azure;

namespace Vantasy.Vootball
{
    public class LeaguesUpdateTeamImage
    {
        private readonly ILogger _logger;

        public LeaguesUpdateTeamImage(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<LeaguesUpload>();
        }

        [Function("LeaguesUpdateTeamImage")]
        public MultiLeagueResponse Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post",
                Route = "leagues/teamimage/{partitionKey}/{id}")] HttpRequestData req,
                [CosmosDBInput(
                databaseName: "vitaovich-cosmosdb-sqldb",
                collectionName: "fantasyfootball-sql-container",
                ConnectionStringSetting = "COSMOS_ENDPOINT",
                Id = "{id}",
                PartitionKey = "{partitionKey}")]LeagueDocument league
            )
        {
            _logger.LogInformation("C# HTTP trigger function processed a request LeaguesUpdateTeamImage.");

            if(league is not null)
            {
                Team theTeam = new Team{
                    TeamId = "team-" + System.Guid.NewGuid().ToString(),
                    Pic = "pic" + System.Guid.NewGuid().ToString()
                };
                league.League.Teams.Add(theTeam);
                league.League.name = System.Guid.NewGuid().ToString();
            }

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            // response.WriteString($"SAS token for: name-{name}, fileName-{fileName}, containerName-{containerName}, permissions-{permissions}, timerange-{timerange}");
            response.WriteString($"Update league:{league.id} with teams: {string.Join(",",league.League.Teams.Select(m => m.TeamId))}");
            _logger.LogInformation($"Update league:{league.id} with teams: {string.Join(",",league.League.Teams.Select(m => m.TeamId))}");
            return new MultiLeagueResponse()
            {
                LeagueDocument = league,
                HttpResponse = response
            };
        }
    }
}
