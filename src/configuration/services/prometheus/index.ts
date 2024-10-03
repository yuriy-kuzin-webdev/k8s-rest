import { KubernetesObject } from "../../../types";
import { Kind } from "../../../types/Kind";


const DEPLOYMENT_API_VERSION = "apps/v1";
const SERVICE_NAME = "prometheus";
const IMAGE = "prom/prometheus:v2.53.0";

export function configurePrometheus(clientId: string): KubernetesObject {
    const PROM_CONFIG = `prometheus-config-${clientId}`
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
                            ports: [
                                {
                                    containerPort: 9090
                                }
                            ],
                            readinessProbe: {
                                httpGet: {
                                    path: "/-/ready",
                                    port: 9090
                                },
                                initialDelaySeconds: 15,
                                periodSeconds: 5
                            },
                            volumeMounts: [
                                {
                                    name: "config-volume",
                                    mountPath: "/etc/prometheus"
                                }
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
