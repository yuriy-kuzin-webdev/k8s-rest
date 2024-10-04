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
        services,
    } = configureEnvironment(clientId);

    await client.exec({ kubernetesObject: namespace });

    for (const cmap of configmaps) {
        await client.exec({ kubernetesObject: cmap });
    }

    for (const service of services) {
        await client.exec({ kubernetesObject: service });
        await client.wait({ kubernetesObject: service });
    }
}

deployEnvironment('test10v01');
