import { Kind } from "../../types/Kind";
import { PersistentVolumeClaim } from "../../types/PersistentVolumeClaim";
import { COREDB } from "../constants";


const {
    PVC_API_VERSION,
    SERVICE_NAME,
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
            accessModes: [ "ReadWriteOnce" ],
            resources: {
                requests: {
                    storage: "1Gi"
                }
            }
        }
    }
}
