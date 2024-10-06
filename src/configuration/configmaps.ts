import { ConfigMap } from "../types/ConfigMap";
import { configurePrometheusConfigMap } from "./prometheus/prometheus.config";


export function configureConfigMaps(clientId: string): ConfigMap[] {
    return [
        configurePrometheusConfigMap(clientId),
    ]
}
