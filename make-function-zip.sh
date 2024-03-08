#!/bin/bash

# Make the Function zip archive for deployment to the Azure Functions App

npm run build
zip -r teams-secret-scanning-notifier.zip . \
-x 'teams-secret-scanning-notifier.zip' '.vscode/*' '*settings*.json' \
    '.git/*' '.github/*' '.gitignore' '.eslint*' '.funcignore' '*.md' \
    'CODEOWNERS' 'LICENSE' '*.ts' '*.map' 'jest.config.js' \
    '*.example' 'node_modules/.bin/*' '*.sh' '*.env' \
    'tsconfig.json' 'package-lock.json' \
    'package.json' 'src/*' 'test/*' 'dist/tsconfig.tsbuildinfo' \
    'node_modules/@types/*' 'node_modules/*jest*/*' \
    'node_modules/*eslint*/*' '*/.github/*' '*/.history/*' \
    '*/.travis.yml' '*/.eslintignore' '*/.eslintrc.yml' \
    '*/.prettierignore' '*/.prettierrc.yml' '*/.nycrc' \
    '*/.jshintignore' '*/.jshintrc' '*/.npmignore' \
    'node_modules/*/@types/*' 'node_modules/*/*jest*/*' \
    '*/LICENSE*' '*/license' '*/.eslintrc' '*/.prettierrc' \
    '*/diagnosticMessages.generated.json' '*/tsconfig.json' \
    '*/.editorconfig'