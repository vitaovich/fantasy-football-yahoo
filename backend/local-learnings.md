
## Create service principal and set up variables for terraform
```bash
service_principal_name="fantasy-football-backend_sp"
sub_id=$(az account show --query "id" -o tsv)
echo "Create service principal $service_principal_name for sub $sub_id"

sp_info=$(az ad sp create-for-rbac --name "$service_principal_name" --role="Contributor" --scopes="/subscriptions/$sub_id" -o json)

ARM_CLIENT_ID=$(echo "$sp_info" | jq -r '.appId')
ARM_CLIENT_SECRET=$(echo "$sp_info" | jq -r '.password')
ARM_TENANT_ID=$(echo "$sp_info" | jq -r '.tenant') 

unset sp_info 
unset sub_id
```

## Setup local.settings.json file
run terraform output
copy relevant data into local.settings.json
```bash
terraform output -json | jq " \
{ \
  Values: { \
    AzureWebJobsStorage: .Azure_Storage_BlobConnectionString.value, \
    Azure_Storage_AccountName: .Azure_Storage_AccountName.value, \
    Azure_Storage_AccountKey: .Azure_Storage_AccountKey.value, \
    COSMOS_ENDPOINT: .COSMOS_ENDPOINT.value[0], \
    COSMOS_KEY: .COSMOS_KEY.value \
  } \
}"
```

## Delete Service Principal
```bash
service_principal_name="fantasy-football-backend_sp"
az ad sp list --display-name $service_principal_name --query "[0].id" -o tsv
az ad sp delete --id $(az ad sp list --display-name $service_principal_name --query "[0].id" -o tsv)
```


curl -X POST "http://localhost:7071/api/leagues/create" \
     -H "Content-Type: application/json" \
     -d '{ "id": "test", "partitionKey": "2023" }'

curl --get \
    http://localhost:7071/api/leagues/get/2023/test