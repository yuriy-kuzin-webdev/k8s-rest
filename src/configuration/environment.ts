import { KubernetesObject } from "../types";
import { configureConfigMaps } from "./configmaps";
import { configureNamespace } from "./namespace";
import { configureDeployments } from "./deployments";


export function configureEnvironment(clientId: string): {
    namespace: KubernetesObject,
    configmaps: KubernetesObject[],
    deployments: KubernetesObject[],
} {
    return {
        namespace: configureNamespace(clientId),
        configmaps: configureConfigMaps(clientId),
        deployments: configureDeployments(clientId),
    }
}
