output "resource_group_id" {
  value = azurerm_resource_group.rg.id
}

# output "cosmos_db_endpoint" {
#   value = azurerm_cosmosdb_account.example.endpoint
# }

output "Azure_Storage_AccountName" {
  value = azurerm_storage_account.example.name
}

output "Azure_Storage_AccountKey" {
  value = azurerm_storage_account.example.primary_access_key
  sensitive = true
}


output "Azure_Storage_BlobConnectionString" {
  value = azurerm_storage_account.example.primary_blob_connection_string
  sensitive = true
}