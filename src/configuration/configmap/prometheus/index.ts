import { KubernetesObject } from "../../../types";
import { Kind } from "../../../types/Kind";


const CONFIGMAP_API_VERSION = "v1";

export function configurePrometheusConfigMap(clientId: string): KubernetesObject {
    return {
        apiVersion: CONFIGMAP_API_VERSION,
        kind: Kind.ConfigMap,
        metadata: {
            name: `prometheus-config-${clientId}`,
            namespace: clientId
        },
        data: {
            "prometheus.yml": `
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
`
        }
    }
}
