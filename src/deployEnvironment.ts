import { KubeClient } from "./kubeclient/KubeClient";
import { configureEnvironment } from "./configuration/environment";


const token = process.env.KUBE_TOKEN || '';
const url = process.env.KUBE_URL || '';

export const deployEnvironment = async (clientId: string) => {
    if (!clientId) {
        return;
    }

    const client = new KubeClient({
        url,
        token,
        namespace: clientId,
    });

    const {
        namespace,
        configmaps,
        deployments,
        pvs,
        pvcs,
        services,
    } = configureEnvironment(clientId);

    await client.apply({ kubernetesObject: namespace });

    for (const cmap of configmaps) {
        await client.apply({ kubernetesObject: cmap });
    }

    for (const pv of pvs) {
        await client.apply({ kubernetesObject: pv });
    }

    for (const pvc of pvcs) {
        await client.apply({ kubernetesObject: pvc });
    }

    for (const service of services) {
        await client.apply({ kubernetesObject: service });
    }

    for (const deployment of deployments) {
        await client.apply({ kubernetesObject: deployment });
        await client.wait({ kubernetesObject: deployment });
    }
}

deployEnvironment('client1001');
