import { Deployment } from "../../types/Deployment";
import { Kind } from "../../types/Kind";
import { COREDB, GRAFANA, PROMETHEUS } from "../constants";


const {
    DEPLOYMENT_API_VERSION,
    IMAGE,
    GRAFANA_CONFIG,
    PORT,
    SERVICE_NAME,
} = GRAFANA;

// TODO https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/
// TODO Decomposition required
// TODO Consider StatefulSets
export function configureGrafana(clientId: string): Deployment {
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
                        },
                        {
                            name: GRAFANA_CONFIG,
                            configMap: {
                                name: GRAFANA_CONFIG
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
                            volumeMounts: [
                                {
                                    name: GRAFANA_CONFIG,
                                    mountPath: "/etc/grafana/provisioning/datasources"
                                },
                                {
                                    name: `${clientId}-${SERVICE_NAME}-storage`,
                                    mountPath: "/var/lib/grafana",
                                },
                            ],
                            env: [
                                {
                                    name: "GF_DATABASE_TYPE",
                                    value: "postgres"
                                },
                                {
                                    name: "GF_DATABASE_HOST",
                                    value: `${COREDB.SERVICE_NAME}.${clientId}.svc.cluster.local:${COREDB.PORT}`
                                },
                                {
                                    name: "GF_DATABASE_USER",
                                    value: "grafana_user"
                                },
                                {
                                    name: "GF_DATABASE_PASSWORD",
                                    value: "your_password"
                                },
                                {
                                    name: "GF_SECURITY_ADMIN_USER",
                                    value: "grafana_user"
                                },
                                {
                                    name: "GF_SECURITY_ADMIN_PASSWORD",
                                    value: "your_password"
                                },
                                {
                                    name: "GF_DATABASE_NAME",
                                    value: "grafana_db"
                                },
                            ]
                        }
                    ],
                }
            }
        }
    };
}
