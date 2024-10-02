import { K8S, KubeClient } from "./kubeclient/KubeClient";
import { Deployment } from "./types/Deployment";
import { Namespace } from "./types/Namespace";

const token = process.env.KUBE_TOKEN || '';
const url = process.env.KUBE_URL || '';


export const deploy = async () => {
    const namespace: Namespace = {
        apiVersion: 'v1',
        kind: 'Namespace',
        metadata: {
            name: 'client3',
        }
    }
    const deployment: Deployment = {
        apiVersion: "apps/v1",
        kind: "Deployment",
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

    const client = new KubeClient({
        url,
        token,
        namespace: 'client3',
    })

    await client.exec({
        payload: namespace,
        resource: K8S.Namespace,
    })

    await client.exec({
        payload: deployment,
        resource: K8S.Deployment
    })


}
deploy()