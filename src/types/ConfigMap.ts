import { Kind } from "./Kind";

export type ConfigMap = {
    apiVersion: string;                     // API version, e.g., "apps/v1"
    kind: Kind;                             // The resource type, e.g., "Deployment"
    metadata: Metadata;                     // Metadata for the deployment (name, namespace, labels, annotations
    data: any;
};

export type Metadata = {
    name: string;                           // Name of the deployment
    namespace?: string;                     // Namespace where the deployment is created (optional)
    labels?: Record<string, string>;        // Key-value labels for categorizing the deployment
    annotations?: Record<string, string>;   // Key-value annotations for extra metadata
};