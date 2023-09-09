using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using FantasyFootball.Models;
using Newtonsoft.Json;
using Azure.Storage.Sas;
using Azure.Storage.Blobs;

namespace Vantasy.Vootball
{
    public class LeaguesUpload
    {
        private readonly ILogger _logger;

        public LeaguesUpload(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<LeaguesUpload>();
        }

        [Function("LeaguesUpload")]
        public HttpResponseData Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post",
                Route = "leagues/upload")] HttpRequestData req
            )
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            string fileName = req.Query["filename"];
            string fileType = req.Query["fileType"];
            string containerName = req.Query["containername"];
            string permissions = req.Query["permission"];
            string timerange = req.Query["timerange"];

            string requestBody = String.Empty;
            using (StreamReader streamReader =  new  StreamReader(req.Body))
            {
                requestBody = streamReader.ReadToEnd();
            }
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            
            fileName = fileName ?? data?.fileName;
            fileType = fileType ?? data?.fileType;
            containerName = containerName ?? data?.containerName;
            permissions = permissions ?? data?.permission;
            timerange = timerange ?? data?.timerange;
            Guid fileGuid = Guid.NewGuid();
            string fileGuidName = fileGuid + "." + fileType;

            string? Azure_Storage_AccountName = System.Environment.GetEnvironmentVariable("Azure_Storage_AccountName", EnvironmentVariableTarget.Process);
            string? Azure_Storage_AccountKey = System.Environment.GetEnvironmentVariable("Azure_Storage_AccountKey", EnvironmentVariableTarget.Process);
            string? Azure_Storage_ConnectionString = System.Environment.GetEnvironmentVariable("AzureWebJobsStorage", EnvironmentVariableTarget.Process);

            if(Azure_Storage_AccountName is not string || 
            Azure_Storage_ConnectionString is not string ||
            Azure_Storage_AccountKey is not string) 
            {
                var badResponse = req.CreateResponse(HttpStatusCode.MethodNotAllowed);
                badResponse.WriteString("Missing required app configuration");
                return badResponse;
            }

            var blobServiceClient = new BlobServiceClient(Azure_Storage_ConnectionString);
            var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);
            var blockBlobClient = blobContainerClient.GetBlobClient(fileGuidName);
            
            BlobSasBuilder sasBuilder = new BlobSasBuilder(BlobContainerSasPermissions.Write, DateTimeOffset.UtcNow.AddMinutes(10))
            {
                BlobContainerName = containerName,
                BlobName = fileGuidName,
                // Protocol = SasProtocol.Https
            };
            
            Uri sasUri = blockBlobClient.GenerateSasUri(sasBuilder);

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

            // response.WriteString($"SAS token for: name-{name}, fileName-{fileName}, containerName-{containerName}, permissions-{permissions}, timerange-{timerange}");
            response.WriteString($"{sasUri}");
            _logger.LogInformation($"Created sas url for file:{fileGuidName}");
            return response;
        }
    }
}
