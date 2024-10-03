import { KubernetesObject } from "../types";
import { configureNamespace } from "./namespace";
import { configureServices } from "./services";

export function configureEnvironment(clientId: string): {
    namespace: KubernetesObject,
    services: KubernetesObject[],
} {
    return {
        namespace: configureNamespace(clientId),
        services: configureServices(clientId),
    }
}