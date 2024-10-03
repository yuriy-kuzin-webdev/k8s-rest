import { deployment, namespace } from "./templates";
import { KubernetesObject } from "./types";

export function configureEnvironment(clientId: string): {
    namespace: KubernetesObject,
    services: KubernetesObject[],
} {
    return {
        namespace,
        services: [
            deployment
        ]
    }
}