# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location

  tags = {
    "Environment" = "Dev",
    "Team"        = "vitaovich"
  }
}

# resource "azurerm_cosmosdb_account" "example" {
#   name                      = random_pet.prefix.id
#   location                  = var.cosmosdb_account_location
#   resource_group_name       = azurerm_resource_group.rg.name
#   offer_type                = "Standard"
#   kind                      = "GlobalDocumentDB"
#   enable_automatic_failover = false
#   enable_free_tier          = true
#   geo_location {
#     location          = var.location
#     failover_priority = 0
#   }
#   consistency_policy {
#     consistency_level       = "BoundedStaleness"
#     max_interval_in_seconds = 300
#     max_staleness_prefix    = 100000
#   }
#   depends_on = [
#     azurerm_resource_group.rg
#   ]
# }

# resource "azurerm_cosmosdb_sql_database" "main" {
#   name                = "${random_pet.prefix.id}-cosmosdb-sqldb"
#   resource_group_name = azurerm_resource_group.rg.name
#   account_name        = azurerm_cosmosdb_account.example.name
#   throughput          = var.throughput
# }

# resource "azurerm_cosmosdb_sql_container" "example" {
#   name                  = "${random_pet.prefix.id}-sql-container"
#   resource_group_name   = azurerm_resource_group.rg.name
#   account_name          = azurerm_cosmosdb_account.example.name
#   database_name         = azurerm_cosmosdb_sql_database.main.name
#   partition_key_path    = "/definition/id"
#   partition_key_version = 1
#   throughput            = var.throughput

#   indexing_policy {
#     indexing_mode = "consistent"

#     included_path {
#       path = "/*"
#     }

#     included_path {
#       path = "/included/?"
#     }

#     excluded_path {
#       path = "/excluded/?"
#     }
#   }

#   unique_key {
#     paths = ["/definition/idlong", "/definition/idshort"]
#   }
# }

resource "azurerm_storage_account" "example" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
  blob_properties {
    cors_rule {
      allowed_origins = ["*"]
      allowed_methods = ["DELETE", "GET", "HEAD", "MERGE", "POST", "OPTIONS", "PUT"]
      allowed_headers = ["*"]
      exposed_headers = ["*"]
      max_age_in_seconds = 86400
    }
  }

  tags = {
    environment = "dev"
  }
}

resource "azurerm_storage_container" "example" {
  name                  = "upload"
  storage_account_name  = azurerm_storage_account.example.name
  container_access_type = "blob"
}

# Adds my own account to 
resource "azurerm_role_assignment" "data-contributor-role" {
  scope                = azurerm_storage_container.example.resource_manager_id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = var.my_principal_id
}

resource "random_pet" "prefix" {
  prefix = var.prefix
  length = 1
}