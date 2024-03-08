#!/bin/bash

set -euo pipefail

. ./azure.env

az account set --subscription "${AZURE_SUBSCRIPTION_ID}"

tmp_file=$(mktemp)

# extract the settings from the local.settings.json file with jq - just pull out the "values" key as the whole new JSON file
jq -r '.Values' local.settings.json > "$tmp_file"

az functionapp config appsettings set --name "${AZURE_FUNCTION_APP_NAME}" --resource-group "${AZURE_RESOURCE_GROUP}" --settings @"$tmp_file"

