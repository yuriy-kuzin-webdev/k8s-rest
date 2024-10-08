import { Kind } from "./Kind";


export type StorageClass = {
    apiVersion: string;                     // API version, e.g., "apps/v1"
    kind: Kind;                             // The resource type, e.g., "Deployment"
    metadata: Metadata;                     // Metadata for the deployment (name, namespace, labels, annotations
    provisioner: string;                    // "kubernetes.io/nfs"
    parameters: StorageParameters;
    mountOptions: string[];
    reclaimPolicy: string;                  // "Retain"
    volumeBindingMode: string;
};

export type Metadata = {
    name: string;                           // Name of the deployment
    namespace?: string;                     // Namespace where the deployment is created (optional)
    labels?: Record<string, string>;        // Key-value labels for categorizing the deployment
    annotations?: Record<string, string>;   // Key-value annotations for extra metadata
};

export type StorageParameters = {
    server: string;                         // instance IP/DNS address
    path: string;                           // Base directory, subdirectories will be defined in PVCs
    readOnly: string;                       // 
}
