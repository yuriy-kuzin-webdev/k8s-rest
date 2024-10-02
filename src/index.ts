import { KubeClient } from "./kubeclient/KubeClient";
import { deployment, namespace } from "./templates";

const token = process.env.KUBE_TOKEN || '';
const url = process.env.KUBE_URL || '';


export const deploy = async () => {
    const client = new KubeClient({
        url,
        token,
        namespace: 'client3',
    })

    await client.exec({ kubernetesObject: namespace })

    await client.exec({ kubernetesObject: deployment })
}

deploy()
