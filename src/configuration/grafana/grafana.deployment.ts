import { Deployment } from "../../types/Deployment";
import { Kind } from "../../types/Kind";
import { COREDB, GRAFANA, PROMETHEUS } from "../constants";


const {
    DEPLOYMENT_API_VERSION,
    IMAGE,
    PORT,
    SERVICE_NAME,
} = GRAFANA;

// TODO Decomposition required
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
                    containers: [
                        {
                            name: SERVICE_NAME,
                            image: IMAGE,
                            ports: [
                                {
                                    containerPort: PORT
                                }
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
                                    name: "GF_DATABASE_NAME",
                                    value: "grafana_db"
                                },
                                {
                                    name: "GF_DATASOURCES",
                                    value: JSON.stringify({
                                        datasources: [
                                            {
                                                name: "Prometheus",
                                                type: "prometheus",
                                                url: `http://${PROMETHEUS.SERVICE_NAME}.${clientId}.svc.cluster.local:${PROMETHEUS.PORT}`,
                                                access: "proxy"
                                            }
                                        ]
                                    })
                                }
                            ]
                        }
                    ]
                }
            }
        }
    };
}
