import { Kind } from "../../types/Kind";
import { PersistentVolume } from "../../types/PersistentVolume";
import { PROMETHEUS } from "../constants";


const {
    PV_API_VERSION,
    SERVICE_NAME,
} = PROMETHEUS;

export function configurePrometheusPV(clientId: string): PersistentVolume {
    return {
        apiVersion: PV_API_VERSION,
        kind: Kind.PersistentVolume,
        metadata: {
            name: `pv-${clientId}-${SERVICE_NAME}`
        },
        spec: {
            capacity: {
                storage: "1Gi"
            },
            accessModes: [ "ReadWriteOnce" ],
            persistentVolumeReclaimPolicy: "Retain",
            hostPath: {
                path: `/mnt/data/${clientId}/${SERVICE_NAME}`
            },
            claimRef: {
                namespace: clientId,
                name: `pvc-${clientId}-${SERVICE_NAME}`,
            }
        }
    }
}
