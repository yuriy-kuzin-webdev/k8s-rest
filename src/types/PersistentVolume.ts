import { Kind } from "./Kind";


export type PersistentVolume = {
    apiVersion: string;                     // API version, e.g., "v1"
    kind: Kind;                             // The resource type, e.g., "PersistentVolume"
    metadata: Metadata;                     // Metadata for the persistent volume (name, namespace, labels, annotations)
    spec: PersistentVolumeSpec;             // The specification of the persistent volume
};

export type Metadata = {
    name: string;                           // Name of the deployment
    namespace?: string;                     // Namespace where the deployment is created (optional)
    labels?: Record<string, string>;        // Key-value labels for categorizing the deployment
    annotations?: Record<string, string>;   // Key-value annotations for extra metadata
};

export type PersistentVolumeSpec = {
    capacity: Record<string, string>;       // Capacity of the persistent volume (e.g., {"storage": "10Gi"})
    accessModes: string[];                  // Access modes for the persistent volume (e.g., ["ReadWriteOnce"])
    nfs?: NFSVolumeSource;
    persistentVolumeReclaimPolicy?: string; // Reclaim policy (e.g., "Retain", "Recycle", "Delete")
    storageClassName?: string;              // Storage class associated with the persistent volume (optional)
    hostPath?: HostPathVolumeSource;        // Host path source (optional)
    persistentVolumeSource?: PersistentVolumeSource; // The volume source (e.g., NFS, iSCSI, etc.)
    claimRef?: ClaimRef;
};

export type ClaimRef = {
    namespace: string;
    name: string;
}

export type HostPathVolumeSource = {
    path: string;                           // Path on the host
};

export type PersistentVolumeSource = {
    nfs?: NFSVolumeSource;                  // NFS volume source (optional)
    iscsi?: ISCSIVolumeSource;              // iSCSI volume source (optional)
};

export type NFSVolumeSource = {
    path: string;                           // Path exported by the NFS server
    server: string;                         // NFS server hostname or IP
};

export type ISCSIVolumeSource = {
    targetPortal: string;                   // iSCSI target portal
    iqn: string;                            // iSCSI Qualified Name
    lun: number;                            // Logical Unit Number
    fsType?: string;                        // Filesystem type (optional)
};
