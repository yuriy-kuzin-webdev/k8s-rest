import { Kind } from "../../types/Kind";
import { PersistentVolumeClaim } from "../../types/PersistentVolumeClaim";
import { PROMETHEUS } from "../constants";


const {
    PVC_API_VERSION,
    SERVICE_NAME,
} = PROMETHEUS;

export function configurePrometheusPVC(clientId: string): PersistentVolumeClaim {
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
