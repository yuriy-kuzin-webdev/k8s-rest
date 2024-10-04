import { KubernetesObject } from "../../types";
import { configurePrometheusConfigMap } from "./prometheus";


export function configureConfigMaps(clientId: string): KubernetesObject[] {
    return [
        configurePrometheusConfigMap(clientId),
    ]
}
