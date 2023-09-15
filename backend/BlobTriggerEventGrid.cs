using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace My.Functions
{
    public class BlobTriggerEventGrid
    {
        private readonly ILogger<BlobTriggerEventGrid> _logger;

        public BlobTriggerEventGrid(ILogger<BlobTriggerEventGrid> logger)
        {
            _logger = logger;
        }

        [Function(nameof(BlobTriggerEventGrid))]
        public async Task Run([BlobTrigger("upload/{name}", Source = BlobTriggerSource.EventGrid, Connection = "AzureWebJobsStorage")] BlobClient myBlob, string name)
        {
            _logger.LogInformation($"C# Blob trigger function Processed blob\n Name: {name} \n Size: {myBlob.Name} Bytes");
        }
    }
}
