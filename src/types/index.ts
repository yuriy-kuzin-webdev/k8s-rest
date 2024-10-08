import { ConfigMap } from "./ConfigMap";
import { Deployment } from "./Deployment";
import { Namespace } from "./Namespace";
import { PersistentVolume } from "./PersistentVolume";
import { PersistentVolumeClaim } from "./PersistentVolumeClaim";
import { Service } from "./Service";
import { StorageClass } from "./StorageClass";


export type KubernetesObject = 
    ConfigMap
    | Deployment
    | Namespace
    | PersistentVolume
    | PersistentVolumeClaim
    | Service
    | StorageClass;
