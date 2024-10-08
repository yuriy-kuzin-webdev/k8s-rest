import { 
    STORAGE_CLASS_API_VERSION, 
    STORAGE_CLASS_BASE_PATH, 
    STORAGE_CLASS_NAME, 
    STORAGE_CLASS_PROVISIONER
} from "./configuration/constants";
import { KubeClient } from "./kubeclient/KubeClient";
import { Kind } from "./types/Kind";
import { StorageClass } from "./types/StorageClass";

const KUBE_TOKEN = process.env.KUBE_TOKEN || '';
const KUBE_URL = process.env.KUBE_URL || '';
const NFS_SERVER = process.env.NFS_SERVER || '';

export const deployStorageClass = async (clientId: string) => {

    const client = new KubeClient({
        url: KUBE_URL,
        token: KUBE_TOKEN,
        namespace: clientId,
    });

    const storageClass: StorageClass = {
        apiVersion: STORAGE_CLASS_API_VERSION,
        kind: Kind.StorageClass,
        metadata: {
            name: STORAGE_CLASS_NAME
        },
        provisioner: STORAGE_CLASS_PROVISIONER,
        parameters: {
            server: NFS_SERVER,
            path: STORAGE_CLASS_BASE_PATH,
            readOnly: "false",
        },
        mountOptions: [
            "hard",
            "nfsvers=3",
        ],
        reclaimPolicy: "Retain",
        volumeBindingMode: "WaitForFirstConsumer"
    }

    await client.apply({ kubernetesObject: storageClass});
}

deployStorageClass('default');
