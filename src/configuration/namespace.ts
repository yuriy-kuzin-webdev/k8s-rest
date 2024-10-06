import { Kind } from "../types/Kind";
import { Namespace } from "../types/Namespace";
import { NAMESPACE_API_VERSION } from "./constants";


export function configureNamespace(clientId: string): Namespace {
    return {
        apiVersion: NAMESPACE_API_VERSION,
        kind: Kind.Namespace,
        metadata: {
            name: clientId,
        }
    }
}
