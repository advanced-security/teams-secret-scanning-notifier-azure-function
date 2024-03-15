#!/bin/bash

set -euo pipefail

# Convert a PEM file to a single line for use in an environment variable
if [ $# -ne 1 ]; then
    echo "Usage: pem-to-oneliner.sh <pem-file>"
    exit 1
fi

PEM_FILE=$1

if [ ! -f "${PEM_FILE}" ]; then
    echo "File not found: ${PEM_FILE}"
    exit 1
fi

# Convert the PEM file to a single line
# use tr to remove newlines
tr -d '\n' < "${PEM_FILE}"
