output "resource_group_id" {
  value = azurerm_resource_group.rg.id
}

# output "cosmos_db_endpoint" {
#   value = azurerm_cosmosdb_account.example.endpoint
# }

output "Azure_Storage_AccountName" {
  value = azurerm_storage_account.my_storage_account.name
}

output "Azure_Storage_AccountKey" {
  value = azurerm_storage_account.my_storage_account.primary_access_key
  sensitive = true
}

output "Azure_Storage_BlobConnectionString" {
  value = azurerm_storage_account.my_storage_account.primary_blob_connection_string
  sensitive = true
}

output "COSMOS_ENDPOINT" {
  value = azurerm_cosmosdb_account.my_cosmos.connection_strings
  sensitive = true
}

output "COSMOS_KEY" {
  value = azurerm_cosmosdb_account.my_cosmos.primary_key
  sensitive = true
}

