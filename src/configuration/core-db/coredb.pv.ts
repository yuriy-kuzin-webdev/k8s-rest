import { Kind } from "../../types/Kind";
import { PersistentVolume } from "../../types/PersistentVolume";
import { COREDB } from "../constants";


const {
    PV_API_VERSION,
    SERVICE_NAME,
    STORAGE_CLASS_BASE_PATH,
    STORAGE_CLASS_NAME,
} = COREDB;

export function configureCoreDbPV(clientId: string): PersistentVolume {
    return {
        apiVersion: PV_API_VERSION,
        kind: Kind.PersistentVolume,
        metadata: {
            name: `pv-${clientId}-${SERVICE_NAME}`
        },
        spec: {
            capacity: {
                storage: "5Gi"
            },
            accessModes: [ "ReadWriteMany" ],
            persistentVolumeReclaimPolicy: "Retain",
            nfs: {
                path: `${STORAGE_CLASS_BASE_PATH}/${clientId}/${SERVICE_NAME}`,
                server: process.env.NFS_SERVER || '',
            },
            claimRef: {
                namespace: clientId,
                name: `pvc-${clientId}-${SERVICE_NAME}`,
            },
            storageClassName: STORAGE_CLASS_NAME,
        }
    }
}
