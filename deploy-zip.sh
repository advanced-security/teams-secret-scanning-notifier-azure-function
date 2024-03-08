#!/bin/bash

. ./azure.env

az account set --subscription "${AZURE_SUBSCRIPTION_ID}"
az functionapp deployment source config-zip --resource-group "${AZURE_RESOURCE_GROUP}" --name "${AZURE_FUNCTION_APP_NAME}" --src teams-secret-scanning-notifier.zip