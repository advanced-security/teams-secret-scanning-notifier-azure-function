#!/bin/bash

. ./azure.env

npm run build
func azure functionapp publish "${AZURE_FUNCTION_APP_NAME}" || echo "Failed to publish function app, try running 'az logout' then 'az login', then try again"
