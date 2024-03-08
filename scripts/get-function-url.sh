#!/bin/bash

set -euo pipefail

. ./azure.env

az account set --subscription "${AZURE_SUBSCRIPTION_ID}"
FUNCTIONS_APP_HOSTNAME=$(az functionapp show --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_FUNCTION_APP_NAME}" --query "defaultHostName" --output tsv)
echo "https://${FUNCTIONS_APP_HOSTNAME}/api/teams-secret-scanning-notifier"
