#!/bin/bash

set -euo pipefail

# Make the Function zip archive for deployment to the Azure Functions App

rm teams-secret-scanning-notifier.zip >/dev/null 2>&1 || echo "[.] No existing zip file to remove"
npm run build >/dev/null 2>&1
zip -q -r teams-secret-scanning-notifier.zip . \
-x 'teams-secret-scanning-notifier.zip' '.vscode/*' '*settings*.json' \
    '.git/*' '.github/*' '.gitignore' '.eslint*' '.funcignore' '*.md' \
    'CODEOWNERS' 'LICENSE' '*.ts' '*.map' 'jest.config.js' \
    '*.example' 'node_modules/.bin/*' '*.sh' '*.env' \
    'tsconfig.json' 'src/*' 'test/*' \
    'node_modules/@types/*' 'node_modules/*jest*/*' \
    'node_modules/*eslint*/*' '*/.github/*' '*/.history/*' \
    '*/.travis.yml' '*/.eslintignore' '*/.eslintrc.yml' \
    '*/.jshintignore' '*/.jshintrc' '*/.npmignore' \
    '*/.prettierignore' '*/.prettierrc.yml' '*/.nycrc' \
    'node_modules/*/@types/*' 'node_modules/*/*jest*/*' \
    '*/LICENSE*' '*/license' '*/.eslintrc' '*/.prettierrc' \
    '*/diagnosticMessages.generated.json' '*/tsconfig.json' \
    '*/.editorconfig'