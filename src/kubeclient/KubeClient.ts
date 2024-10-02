import { Resource } from "../types";

export enum K8S {
    Namespace = 'Namespace',
    Deployment = 'Deployment'
}

type KubeClientOptions = {
    url: string;
    token: string;
    namespace: string;
}

export class KubeClient {
    private url: string;
    private token: string;
    private namespace: string;

    constructor(options: KubeClientOptions) {
        this.url = options.url;
        this.token = options.token;
        this.namespace = options.namespace;
    }

    private getEndpoint(resource: K8S) {
        switch (resource) {
            case K8S.Namespace: return this.url + '/api/v1/namespaces';
            case K8S.Deployment: return this.url + `/apis/apps/v1/namespaces/${this.namespace}/deployments`
        }
    }

    async exec({ payload, resource }: { payload: Resource, resource: K8S }): Promise<void> {
        const url = this.getEndpoint(resource);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create ${resource}: ${response.statusText} - ${errorText}`);
        }

        console.log(`${resource} successfully applied.`);
    }
}