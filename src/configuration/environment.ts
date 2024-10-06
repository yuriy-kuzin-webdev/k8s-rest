import { KubernetesObject } from "../types";
import { configureConfigMaps } from "./configmaps";
import { configureNamespace } from "./namespace";
import { configureDeployments } from "./deployments";
import { configureServices } from "./services";


export function configureEnvironment(clientId: string): {
    namespace: KubernetesObject,
    configmaps: KubernetesObject[],
    deployments: KubernetesObject[],
    services: KubernetesObject[],
} {
    return {
        namespace: configureNamespace(clientId),
        configmaps: configureConfigMaps(clientId),
        deployments: configureDeployments(clientId),
        services: configureServices(clientId),
    }
}
