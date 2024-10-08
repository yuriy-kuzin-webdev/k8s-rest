import { Kind } from "./Kind";


export type PersistentVolumeClaim = {
    apiVersion: string;                     // API version, e.g., "v1"
    kind: Kind;                             // The resource type, e.g., "PersistentVolumeClaim"
    metadata: Metadata;                     // Metadata for the persistent volume claim (name, namespace, labels, annotations)
    spec: PersistentVolumeClaimSpec;        // The specification for the persistent volume claim
};

export type Metadata = {
    name: string;                           // Name of the deployment
    namespace?: string;                     // Namespace where the deployment is created (optional)
    labels?: Record<string, string>;        // Key-value labels for categorizing the deployment
    annotations?: Record<string, string>;   // Key-value annotations for extra metadata
};

export type PersistentVolumeClaimSpec = {
    accessModes: string[];                  // Access modes for the claim (e.g., ["ReadWriteOnce"])
    resources: PersistentResourceRequirements; // Resource requests for the claim
    storageClassName?: string;              // Storage class associated with the claim (optional)
    volumeName?: string;                    // Name of the persistent volume to bind (optional)
};

export type PersistentResourceRequirements = {
    requests: Record<string, string>;       // Requested resources (e.g., {"storage": "5Gi"})
};
