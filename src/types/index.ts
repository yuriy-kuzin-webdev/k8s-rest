import { ConfigMap } from "./ConfigMap";
import { Deployment } from "./Deployment";
import { Namespace } from "./Namespace";

export type KubernetesObject = Deployment | Namespace | ConfigMap;