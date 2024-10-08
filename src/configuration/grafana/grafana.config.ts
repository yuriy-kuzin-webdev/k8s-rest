import { ConfigMap } from "../../types/ConfigMap";
import { Kind } from "../../types/Kind";
import { GRAFANA, PROMETHEUS } from "../constants";


const {
    CONFIGMAP_API_VERSION,
    GRAFANA_CONFIG,
} = GRAFANA;

export function configureGrafanaConfigMap(clientId: string): ConfigMap {
    return {
        apiVersion: CONFIGMAP_API_VERSION,
        kind: Kind.ConfigMap,
        metadata: {
            name: GRAFANA_CONFIG,
            namespace: clientId
        },
        // TODO js obj to yaml
        data: {
            "prometheus-datasource.yaml": `
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://${PROMETHEUS.SERVICE_NAME}.${clientId}.svc.cluster.local:${PROMETHEUS.PORT}
    isDefault: true
`
        }
    }
}
