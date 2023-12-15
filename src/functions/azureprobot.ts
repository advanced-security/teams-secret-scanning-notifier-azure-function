import { app } from "@azure/functions";
import { createProbot, createAzureFunctionV4 } from "@probot/adapter-azure-functions";

import probotapp from "./app";

app.http('webhook-mirror', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: createAzureFunctionV4(probotapp, {
    probot: createProbot(),
  })
});
