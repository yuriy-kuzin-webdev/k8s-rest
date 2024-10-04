import { ConfigMap } from "../../types/ConfigMap";
import { configurePrometheusConfigMap } from "./prometheus";


export function configureConfigMaps(clientId: string): ConfigMap[] {
    return [
        configurePrometheusConfigMap(clientId),
    ]
}
