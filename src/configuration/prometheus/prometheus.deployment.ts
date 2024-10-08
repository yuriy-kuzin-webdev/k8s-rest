import { Deployment } from "../../types/Deployment";
import { Kind } from "../../types/Kind";
import { PROMETHEUS } from "../constants";


const {
    DEPLOYMENT_API_VERSION,
    IMAGE,
    PORT,
    PROM_CONFIG,
    SERVICE_NAME,
} = PROMETHEUS;

// TODO Decomposition required
// TODO Consider StatefulSets
export function configurePrometheus(clientId: string): Deployment {
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
                            ports: [
                                {
                                    containerPort: PORT
                                }
                            ],
                            readinessProbe: {
                                httpGet: {
                                    path: "/-/ready",
                                    port: PORT
                                },
                                initialDelaySeconds: 15,
                                periodSeconds: 5
                            },
                            volumeMounts: [
                                {
                                    name: "config-volume",
                                    mountPath: "/etc/prometheus"
                                },
                                {
                                    mountPath: "/prometheus",
                                    name: `${clientId}-${SERVICE_NAME}-storage`,
                                },
                            ]
                        }
                    ],
                    volumes: [
                        {
                            name: "config-volume",
                            configMap: {
                                name: PROM_CONFIG
                            }
                        }
                    ]
                }
            }
        }
    }
}
