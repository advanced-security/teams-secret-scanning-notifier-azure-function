#!/bin/bash

set -euo pipefail

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

. "${SCRIPT_DIR}"/azure.env

# set Azure location to us-east unless it is set to something different already
AZURE_STORAGE_ACCOUNT="${AZURE_STORAGE_ACCOUNT:-teamssecretnotifier001sa}"

az account set --subscription "${AZURE_SUBSCRIPTION_ID}"
az group create --name "${AZURE_RESOURCE_GROUP}" --location "${AZURE_LOCATION}" --tags Owner="$(id -un)"
az storage account create --name "${AZURE_STORAGE_ACCOUNT}" --location "${AZURE_LOCATION}" --resource-group "${AZURE_RESOURCE_GROUP}" --sku Standard_LRS --tags Owner="$(id -un)"
az functionapp create --resource-group "${AZURE_RESOURCE_GROUP}" --consumption-plan-location "${AZURE_LOCATION}" --runtime node --runtime-version 20 --functions-version 4 --name "${AZURE_FUNCTION_APP_NAME}" --storage-account "${AZURE_STORAGE_ACCOUNT}" --tags Owner="$(id -un)"
