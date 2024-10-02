export type Namespace = {
    apiVersion: string;                     // API version, e.g., "v1"
    kind: string;                           // The resource type, e.g., "Namespace"
    metadata: Metadata;                     // Metadata for the namespace (name, labels, annotations)
    spec?: NamespaceSpec;                   // Optional spec field to define behaviors related to the namespace
    status?: NamespaceStatus;               // Optional status field to describe the current state of the namespace
};

export type Metadata = {
    name: string;                           // Name of the namespace
    labels?: Record<string, string>;        // Key-value labels for categorizing the namespace (optional)
    annotations?: Record<string, string>;   // Key-value annotations for extra metadata (optional)
};

export type NamespaceSpec = {
    finalizers?: string[];                  // List of finalizers that must complete before namespace deletion
};

export type NamespaceStatus = {
    phase?: string;                         // Current lifecycle phase of the namespace (e.g., "Active", "Terminating")
};
