import { KubernetesObject } from "../types";
import { Kind } from "../types/Kind";

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

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create ${kubernetesObject}: ${response.statusText} - ${errorText}`);
        }

        console.log(`${kubernetesObject} successfully applied.`);
    }
}