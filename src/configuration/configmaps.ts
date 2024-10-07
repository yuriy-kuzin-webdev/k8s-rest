import { ConfigMap } from "../types/ConfigMap";
import { configureGrafanaConfigMap } from "./grafana/grafana.config";
import { configurePrometheusConfigMap } from "./prometheus/prometheus.config";


export function configureConfigMaps(clientId: string): ConfigMap[] {
    return [
        configurePrometheusConfigMap(clientId),
        configureGrafanaConfigMap(clientId),
    ]
}
