import { Deployment } from "../../types/Deployment";
import { Kind } from "../../types/Kind";
import { COREDB } from "../constants";


const {
    DEPLOYMENT_API_VERSION,
    IMAGE,
    PORT,
    SERVICE_NAME,
} = COREDB;

// TODO Decomposition required
// TODO Consider StatefulSets
export function configureCoreDB(clientId: string): Deployment {
    return {
        apiVersion: DEPLOYMENT_API_VERSION,
        kind: Kind.Deployment,
        metadata: {
            name: SERVICE_NAME,
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
                    volumes: [
                        {
                            name: `${clientId}-${SERVICE_NAME}-storage`,
                            persistentVolumeClaim: {
                                claimName: `pvc-${clientId}-${SERVICE_NAME}`,
                            }
                        }
                    ],
                    containers: [
                        {
                            name: SERVICE_NAME,
                            image: IMAGE,
                            volumeMounts: [
                                {
                                    mountPath: "/var/lib/postgresql/data",
                                    name: `${clientId}-${SERVICE_NAME}-storage`,
                                },
                            ],
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
                                    containerPort: PORT
                                }
                            ],
                            readinessProbe: {
                                tcpSocket: {
                                    port: PORT
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
