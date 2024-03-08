import { SecretScanningAlertWebHookPayload } from "./types";
import axios from "axios";
import * as url from "url";

const ACTION_ICONS: { [key: string]: string } = {
    created: "🔑",
    resolved: "✅",
    reopened: "🔑",
    dismissed: "❌"
};

const PRIVATE_ICON = "🔒";
const PUBLIC_ICON = "🌐";

function validateTeamsWebhook(webhook: string): string | null {
    if (!webhook.startsWith("https://")) {
        return null;
    }

    // parse as a URL to validate
    try {
        const parsedUrl = new url.URL(webhook);

        if (parsedUrl.protocol !== "https:") {
            return null;
        }

        if (!parsedUrl.hostname) {
            return null;
        }

        if (!parsedUrl.hostname.endsWith(".webhook.office.com")) {
            return null;
        }

        if (!parsedUrl.pathname.startsWith("/webhookb2/")) {
            return null;
        }

        if (!parsedUrl.pathname.includes("/IncomingWebhook/")) {
            return null;
        }

        // that's good enough, if any more of the format is wrong then the server will reject it
        return parsedUrl.href;
    } catch (e) {
        return null;
    }
}

export const notifyTeams = async (eventData: SecretScanningAlertWebHookPayload) => {
    // get Teams webhook out of app settings in Azure Function
    const teamsWebhook = process.env.TEAMS_WEBHOOK_URL;

    if (!teamsWebhook) {
        throw new Error("TEAMS_WEBHOOK_URL is not set");
    }

    if (!validateTeamsWebhook(teamsWebhook)) {
        throw new Error("TEAMS_WEBHOOK_URL is not valid");
    }

    // notify Teams using the webhook
    const teamsMessage = makeTeamsMessage(eventData);

    await postToTeams(teamsWebhook, teamsMessage);
}

const postToTeams = async (teamsWebhook: string, teamsMessage: any) => {
    try {
        const response = await axios.post(teamsWebhook, teamsMessage, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status !== 200) {
            console.error(`Error posting to Teams webhook: ${response.statusText}`);
            return false;
        }

        return true;
    } catch (e) {
        console.error(`Error parsing event data: ${e}`);
        return false;
    }
}

const makeTeamsMessage = (eventData: SecretScanningAlertWebHookPayload) => {
    try {
        const action = eventData.action;
        const owner = eventData.repository.owner.login;
        const repo = eventData.repository.name;
        const privateRepo = eventData.repository.private;
        const eventTime = eventData.alert.created_at;
        const secretScanningViewUrl = eventData.alert.html_url;

        const actionIcon = ACTION_ICONS[action] || "";
        const visibilityIcon = privateRepo ? PRIVATE_ICON : PUBLIC_ICON;

        const teamsMessage = {
            type: "message",
            attachments: [
                {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    contentUrl: null,
                    content: {
                        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                        type: "AdaptiveCard",
                        version: "1.2",
                        body: [
                            {
                                type: "TextBlock",
                                text: `Secret scanning 🔑 alert ${action} on GitHub repo ${owner}/${repo}`,
                                wrap: true,
                                style: "heading",
                                size: "large",
                                weight: "bolder",
                            },
                            {
                                type: "FactSet",
                                facts: [
                                    { title: "Action", value: `${action} ${actionIcon}` },
                                    { title: "Repo", value: `${owner}/${repo}` },
                                    { title: "Visibility", value: `${privateRepo ? 'private' : 'public'} ${visibilityIcon}` },
                                    { title: "Time", value: eventTime },
                                ],
                            },
                        ],
                        actions: [
                            {
                                type: "Action.OpenUrl",
                                title: "View on GitHub",
                                url: secretScanningViewUrl,
                                role: "button",
                            }
                        ],
                    },
                }
            ],
        };

        return teamsMessage;
    } catch (e) {
        console.error(`Error creating Teams message: ${e}`);
        return null;
    }
}
