import { Probot } from "probot";
import { EmitterWebhookEvent } from "@octokit/webhooks";
import { SecretScanningAlertWebHookPayload } from "./types";
import { eventFilter } from "./filter";
import { notifyTeams } from "./teams_notifier";

const setupApp = (app: Probot) => {
  app.onAny(async (event: EmitterWebhookEvent) => {
    const payload = event.payload as SecretScanningAlertWebHookPayload;

    if (eventFilter(event)) {
      await notifyTeams(payload);
    }
  });
};

export default setupApp;
