import { KubernetesObject } from "../types";
import { configureConfigMaps } from "./configmap";
import { configureNamespace } from "./namespace";
import { configureServices } from "./services";


export function configureEnvironment(clientId: string): {
    namespace: KubernetesObject,
    configmaps: KubernetesObject[],
    services: KubernetesObject[],
} {
    return {
        namespace: configureNamespace(clientId),
        configmaps: configureConfigMaps(clientId),
        services: configureServices(clientId),
    }
}
