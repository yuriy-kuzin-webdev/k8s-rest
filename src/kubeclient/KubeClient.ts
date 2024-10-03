import { KubernetesObject } from "../types";
import { Kind } from "../types/Kind";

const RETRY_MS = 5000;

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

    private getEndpoint(kind: Kind) {
        switch (kind) {
            case Kind.Namespace: return this.url + '/api/v1/namespaces';
            case Kind.Deployment: return this.url + `/apis/apps/v1/namespaces/${this.namespace}/deployments`
            case Kind.ConfigMap: return this.url + `/api/v1/namespaces/${this.namespace}/configmaps`
            default: throw new Error(`Unsupported Kubernetes kind: ${kind}`);
        }
    }

    async exec({ kubernetesObject }: { kubernetesObject: KubernetesObject }): Promise<void> {
        const url = this.getEndpoint(kubernetesObject.kind);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(kubernetesObject),
        })

        // TODO add logic to handle failures
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create ${kubernetesObject}: ${response.statusText} - ${errorText}`);
        }

        const json = await response.json();
        // TODO import logger
        // console.log(JSON.stringify(json, null, 2));
        console.log(`${kubernetesObject} successfully applied.`);
    }

    async check({ kubernetesObject }: { kubernetesObject: KubernetesObject }): Promise<boolean> {
        const url = this.getEndpoint(kubernetesObject.kind);
        const response = await fetch(`${url}/${kubernetesObject.metadata.name}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
        })

        // TODO add logic to handle failures
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create ${kubernetesObject}: ${response.statusText} - ${errorText}`);
        }

        const deployment = await response.json();
        const desiredReplicas = deployment.spec?.replicas || 1;
        const availableReplicas = deployment.status?.availableReplicas || 0;

        return (availableReplicas === desiredReplicas)
            ? true
            : false
    }

    async wait({ kubernetesObject }: { kubernetesObject: KubernetesObject }): Promise<void> {
        let isReady = false;
        while(!isReady) {
            // TODO import logger
            console.log(`Waiting for ${kubernetesObject.metadata.name }`);
            isReady = await this.check({ kubernetesObject });
            if(!isReady) {
                // TODO import logger
                console.log(`Not ready... Retrying in ${RETRY_MS} milliseconds`)
                await new Promise((resolve) => setTimeout(resolve, RETRY_MS))
            }
        }
        // TODO import logger
        console.log('ready')
    }
}