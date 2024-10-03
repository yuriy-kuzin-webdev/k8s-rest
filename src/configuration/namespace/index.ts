import { Kind } from "../../types/Kind";
import { Namespace } from "../../types/Namespace";


const NAMESPACE_API_VERSION = "v1";

export function configureNamespace(clientId: string): Namespace {
    return {
        apiVersion: NAMESPACE_API_VERSION,
        kind: Kind.Namespace,
        metadata: {
            name: clientId,
        }
    }
}