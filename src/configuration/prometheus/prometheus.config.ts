import { ConfigMap } from "../../types/ConfigMap";
import { Kind } from "../../types/Kind";
import { PROMETHEUS } from "../constants";


const {
    CONFIGMAP_API_VERSION,
    PROM_CONFIG,
} = PROMETHEUS;

export function configurePrometheusConfigMap(clientId: string): ConfigMap {
    return {
        apiVersion: CONFIGMAP_API_VERSION,
        kind: Kind.ConfigMap,
        metadata: {
            name: PROM_CONFIG,
            namespace: clientId
        },
        // TODO js obj to yaml
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
