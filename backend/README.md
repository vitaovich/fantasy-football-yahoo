# Backend
Using [Azure functions Isolated process](https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide)


# Learnings
## [Running Azure Functions on M1 mac](https://jimbobbennett.dev/blogs/azure-functions-python-m1/)
Enable Use Virtualization framework in docker

Enable use Rosetta for x86/amd64 emulation on Apple Silicon

## verify required bash tools are installed such as "jq" (TODO)
Install with 
```bash
sudo apt-get install jq
```

URL encode a value with jq
```bash
value="my value"
printf %s "$value" | jq -s -R -r @uri
```

Test a url with query using curl
```bash
# curl GET Example
curl --get \
    --data-urlencode "id=30eadf76-f61c-4c1e-84fd-f238fb0c3b39" \
    --data-urlencode "partitionKey=81e06401-4d8f-4f8d-a751-4e313bf23775" \
    http://localhost:7071/api/httptrigcosmosdbget

# curl POST Example
curl -X POST "http://localhost:7071/api/leagues/2023/yahoo-829d5a7f-2825-4159-bf8e-3762cae234e7" \
     -H "Content-Type: application/json" \
     -d '{ "name": "test" }'
```


## [Using Images, Dockerfiles, and Docker Compose](https://containers.dev/guide/dockerfile)

## [Install extensions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Cportal%2Cv2%2Cbash&pivots=programming-language-csharp#install-extensions)

## [Best practices for reliable Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-best-practices?tabs=csharp)

## [Develop Azure Functions by using Visual Studio Code](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=csharp)

## [Azure Functions triggers and bindings concepts](https://learn.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings?tabs=csharp#supported-bindings)

## Terraform
- [Manage Azure Cosmos DB for NoSQL resources with terraform](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/manage-with-terraform)

## Uploading to Azure Blob Storage
- [Upload an image to an Azure Storage blob with JavaScript](https://learn.microsoft.com/en-us/azure/developer/javascript/tutorial/browser-file-upload-azure-storage-blob?tabs=github-codespaces)

- [Github link to repo: azure-upload-file-to-storage](https://github.com/vitaovich/azure-typescript-e2e-apps/tree/main/azure-upload-file-to-storage)

- [Create a service SAS for a blob](https://learn.microsoft.com/en-us/azure/storage/blobs/sas-service-create-dotnet#create-a-service-sas-for-a-blob)

- [Azure Storage Blob client library for JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#with-sas-token)

## Cosmos DB
- [Azure Cosmos DB input binding for Azure Functions 2.x and higher](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-input?tabs=python-v2%2Cin-process%2Cextensionv4&pivots=programming-language-csharp)
- [Data modeling in Azure Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/modeling-data)
- [Connect Azure Functions to Azure Cosmos DB using Visual Studio Code](https://learn.microsoft.com/en-us/azure/azure-functions/functions-add-output-binding-cosmos-db-vs-code?tabs=in-process%2Cv1&pivots=programming-language-csharp)
- [Partitioning and horizontal scaling in Azure Cosmos DB](https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning-overview)
- [Exercise - Read and query items](https://learn.microsoft.com/en-us/training/modules/build-dotnet-app-azure-cosmos-db-nosql/6-exercise-read-query?tabs=run-app)
