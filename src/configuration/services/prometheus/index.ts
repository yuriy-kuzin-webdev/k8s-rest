import { Kind } from "../../../types/Kind";
import { Service } from "../../../types/Service";
import { PROMETHEUS } from "../../constants";


const {
    PORT,
    SERVICE_API_VERSION,
    SERVICE_NAME,
} = PROMETHEUS;

export function configurePrometheusService(clientId: string): Service {
    return {
        apiVersion: SERVICE_API_VERSION,
        kind: Kind.Service,
        metadata: {
            name: SERVICE_NAME,
            namespace: clientId
        },
        spec: {
            selector: {
                app: SERVICE_NAME,
            },
            ports: [
                {
                    protocol: "TCP",
                    port: PORT,
                    targetPort: PORT,
                }
            ]
        }
    }
}
