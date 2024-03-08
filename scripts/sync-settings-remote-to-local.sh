#!/bin/bash

set -euo pipefail

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

. "${SCRIPT_DIR}"/azure.env

az account set --subscription "${AZURE_SUBSCRIPTION_ID}"

# use jq to turn it into the same format as the local.settings.json file
az functionapp config appsettings list --name "${AZURE_FUNCTION_APP_NAME}" --resource-group "${AZURE_RESOURCE_GROUP}" | \
jq -r '{Values: map({(.name): .value}) | add, IsEncrypted: false, ConnectionStrings: {} }' > remote.settings.json