interface InstallationLite {
    id: number;
    node_id: string;
}

export interface GitHubAppWebHookPayload {   
    installation: InstallationLite;
    repository: {
        name: string;
        owner: {
            login: string;
        }
        private: boolean;
    }
}

// add specific properties we need from secret_scanning_alert
export interface SecretScanningAlertWebHookPayload extends GitHubAppWebHookPayload {
    action: string;
    alert: {
        created_at: string;
        html_url: string;
    }
}
