import { Deployment } from "../types/Deployment";
import { Kind } from "../types/Kind";
import { Namespace } from "../types/Namespace";

export const namespace: Namespace = {
    apiVersion: 'v1',
    kind: Kind.Namespace,
    metadata: {
        name: 'client3',
    }
}
export const deployment: Deployment = {
    apiVersion: "apps/v1",
    kind: Kind.Deployment,
    metadata: {
        name: "grafana",
        namespace: "client3",
        labels: {
            app: "grafana"
        }
    },
    spec: {
        replicas: 1,
        selector: {
            matchLabels: {
                app: "grafana"
            }
        },
        template: {
            metadata: {
                labels: {
                    app: "grafana"
                },
                name: "grafana"
            },
            spec: {
                containers: [
                    {
                        name: "grafana",
                        image: "grafana/grafana:latest",
                        ports: [
                            {
                                containerPort: 3000
                            }
                        ]
                    }
                ]
            }
        }
    }
};