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
        services,
    } = configureEnvironment(clientId);

    await client.apply({ kubernetesObject: namespace });

    // TODO Consider storage classes for isolation level

    for (const cmap of configmaps) {
        await client.apply({ kubernetesObject: cmap });
    }

    for (const service of services) {
        await client.apply({ kubernetesObject: service });
    }

    for (const deployment of deployments) {
        await client.apply({ kubernetesObject: deployment });
        await client.wait({ kubernetesObject: deployment });
    }
}

deployEnvironment('test10v03210');
