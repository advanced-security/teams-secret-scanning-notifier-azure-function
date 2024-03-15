#!/bin/bash

set -euo pipefail

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

. "${SCRIPT_DIR}"/azure.env

npm install
npm run build
func azure functionapp publish "${AZURE_FUNCTION_APP_NAME}" || echo "Failed to publish function app, try running 'az logout' then 'az login', then try again"
