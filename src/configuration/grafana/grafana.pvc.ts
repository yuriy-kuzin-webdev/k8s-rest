import { Kind } from "../../types/Kind";
import { PersistentVolumeClaim } from "../../types/PersistentVolumeClaim";
import { GRAFANA } from "../constants";


const {
    PVC_API_VERSION,
    SERVICE_NAME,
} = GRAFANA;

export function configureGrafanaPVC(clientId: string): PersistentVolumeClaim {
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
