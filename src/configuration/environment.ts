import { KubernetesObject } from "../types";
import { configureConfigMaps } from "./configmaps";
import { configureNamespace } from "./namespace";
import { configureDeployments } from "./deployments";
import { configureServices } from "./services";
import { configurePVs } from "./pvs";
import { configurePVCs } from "./pvcs";


export function configureEnvironment(clientId: string): {
    namespace: KubernetesObject,
    configmaps: KubernetesObject[],
    deployments: KubernetesObject[],
    pvs: KubernetesObject[],
    pvcs: KubernetesObject[],
    services: KubernetesObject[],
} {
    return {
        namespace: configureNamespace(clientId),
        configmaps: configureConfigMaps(clientId),
        deployments: configureDeployments(clientId),
        pvs: configurePVs(clientId),
        pvcs: configurePVCs(clientId),
        services: configureServices(clientId),
    }
}
