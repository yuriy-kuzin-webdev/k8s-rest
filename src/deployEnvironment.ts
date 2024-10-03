import { KubeClient } from "./kubeclient/KubeClient";
import { configureEnvironment } from "./configureEnvironment";

const token = process.env.KUBE_TOKEN || '';
const url = process.env.KUBE_URL || '';

export const deployEnvironment = async (clientId: string) => {

    const client = new KubeClient({
        url,
        token,
        namespace: clientId,
    });

    const { 
        namespace,
        services,
    } = configureEnvironment(clientId);

    await client.exec({ kubernetesObject: namespace })

    for (const service of services) {
        await client.exec({ kubernetesObject: service })
    }
}

deployEnvironment('test');
