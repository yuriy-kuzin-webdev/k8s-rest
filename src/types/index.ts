import { ConfigMap } from "./ConfigMap";
import { Deployment } from "./Deployment";
import { Namespace } from "./Namespace";
import { Service } from "./Service";


export type KubernetesObject = Deployment | Namespace | ConfigMap | Service;
