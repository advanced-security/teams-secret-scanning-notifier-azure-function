#!/bin/bash

. ./azure.env

az account set --subscription "${AZURE_SUBSCRIPTION_ID}"

# extract the settings from the local.settings.json file with jq - just pull out the "values" key as the whole new JSON file
jq -r '.Values' local.settings.json > local.settings.values.json

az functionapp config appsettings set --name "${AZURE_FUNCTION_APP_NAME}" --resource-group "${AZURE_RESOURCE_GROUP}" --settings @local.settings.values.json

