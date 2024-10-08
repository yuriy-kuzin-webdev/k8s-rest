import { Kind } from "../../types/Kind";
import { PersistentVolumeClaim } from "../../types/PersistentVolumeClaim";
import { COREDB } from "../constants";


const {
    PVC_API_VERSION,
    SERVICE_NAME,
    STORAGE_CLASS_NAME
} = COREDB;

export function configureCoreDbPVC(clientId: string): PersistentVolumeClaim {
    return {
        apiVersion: PVC_API_VERSION,
        kind: Kind.PersistentVolumeClaim,
        metadata: {
            name: `pvc-${clientId}-${SERVICE_NAME}`,
            namespace: clientId
        },
        spec: {
            accessModes: [ "ReadWriteMany" ],
            resources: {
                requests: {
                    storage: "5Gi"
                }
            },
            volumeName: `pv-${clientId}-${SERVICE_NAME}`,
            storageClassName: STORAGE_CLASS_NAME
        }
    }
}
