import { KubernetesObject } from "../../../types";
import { Kind } from "../../../types/Kind";


const DEPLOYMENT_API_VERSION = "apps/v1";
const SERVICE_NAME = "postgresql";
const IMAGE = "postgres:16";

export function configureCoreDB(clientId: string): KubernetesObject {
    return {
        apiVersion: DEPLOYMENT_API_VERSION,
        kind: Kind.Deployment,
        metadata: {
            name: `${SERVICE_NAME}-${clientId}`,
            namespace: clientId,
            labels: {
                app: SERVICE_NAME
            }
        },
        spec: {
            replicas: 1,
            selector: {
                matchLabels: {
                    app: SERVICE_NAME
                }
            },
            template: {
                metadata: {
                    labels: {
                        app: SERVICE_NAME
                    },
                    name: SERVICE_NAME
                },
                spec: {
                    containers: [
                        {
                            name: SERVICE_NAME,
                            image: IMAGE,
                            env: [
                                {
                                    name: "POSTGRES_USER",
                                    value: "grafana_user"
                                },
                                {
                                    name: "POSTGRES_PASSWORD",
                                    value: "your_password"
                                },
                                {
                                    name: "POSTGRES_DB",
                                    value: "grafana_db"
                                }
                            ],
                            ports: [
                                {
                                    containerPort: 5432
                                }
                            ],
                            readinessProbe: {
                                tcpSocket: {
                                    port: 5432
                                },
                                initialDelaySeconds: 10,
                                periodSeconds: 5,
                            },
                        }
                    ]
                }
            }
        }
    };
}