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
    }
}
