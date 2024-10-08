import { Kind } from "./Kind";


export type Deployment = {
    apiVersion: string;                     // API version, e.g., "apps/v1"
    kind: Kind;                             // The resource type, e.g., "Deployment"
    metadata: Metadata;                     // Metadata for the deployment (name, namespace, labels, annotations)
    spec: DeploymentSpec;                   // The desired state specification for the deployment
};

export type Metadata = {
    name: string;                           // Name of the deployment
    namespace?: string;                     // Namespace where the deployment is created (optional)
    labels?: Record<string, string>;        // Key-value labels for categorizing the deployment
    annotations?: Record<string, string>;   // Key-value annotations for extra metadata
};

export type DeploymentSpec = {
    replicas: number;                       // Number of desired pod replicas
    selector: LabelSelector;                // Selector to identify pods managed by the deployment
    template: PodTemplateSpec;              // Template describing the pods
    strategy?: DeploymentStrategy;          // Deployment strategy (optional)
    revisionHistoryLimit?: number;          // Number of old ReplicaSets to retain (optional)
    progressDeadlineSeconds?: number;       // Deadline for marking the deployment as failed (optional)
};

export type LabelSelector = {
    matchLabels: Record<string, string>;    // Labels used to match the pods managed by the deployment
};

export type PodTemplateSpec = {
    metadata: Metadata;                     // Metadata for the pods (labels, annotations)
    spec: PodSpec;                          // Pod specification
};

export type PodSpec = {
    containers: Container[];                // List of containers in the pod
    volumes?: Volume[];                     // List of volumes for the pod (optional)
    restartPolicy?: string;                 // Restart policy for the pod (e.g., "Always", "OnFailure", "Never")
    terminationGracePeriodSeconds?: number; // Time in seconds before forcibly terminating the pod (optional)
};

export type Container = {
    name: string;                           // Name of the container
    image: string;                          // Container image
    imagePullPolicy?: string;               // Image pull policy (e.g., "Always", "IfNotPresent", "Never")
    ports?: ContainerPort[];                // List of ports exposed by the container (optional)
    env?: EnvVar[];                         // List of environment variables for the container (optional)
    resources?: ResourceRequirements;       // CPU and memory resource requirements (optional)
    livenessProbe?: Probe;                  // Liveness probe for health checks (optional)
    readinessProbe?: Probe;                 // Readiness probe for health checks (optional)
    volumeMounts?: VolumeMount[];           // List of volumes to mount into the container (optional)
};

export type ContainerPort = {
    containerPort: number;                  // Port number exposed by the container
};

export type EnvVar = {
    name: string;                           // Name of the environment variable
    value?: string;                         // Value of the environment variable
    valueFrom?: EnvVarSource;               // Source to fetch the environment variable value (optional)
};

export type EnvVarSource = {
    secretKeyRef?: SecretKeySelector;       // Reference to a key in a Kubernetes Secret (optional)
};

export type SecretKeySelector = {
    name: string;                           // Name of the Secret
    key: string;                            // Key within the Secret
};

export type ResourceRequirements = {
    requests?: ResourceList;                // Minimum resources required (optional)
    limits?: ResourceList;                  // Maximum resources allowed (optional)
};

export type ResourceList = {
    memory?: string;                        // Memory (e.g., "64Mi")
    cpu?: string;                           // CPU (e.g., "250m")
};

export type Probe = {
    httpGet?: HTTPGetAction;                // HTTP GET action for probing
    initialDelaySeconds?: number;           // Delay before starting the probe (optional)
    periodSeconds?: number;                 // Period to perform the probe (optional)
    tcpSocket?: TCPAction;
};

export type TCPAction = {
    port?: number
}

export type HTTPGetAction = {
    path: string;                           // Path to probe
    port: number;                           // Port to probe
};

export type VolumeMount = {
    name: string;                           // Name of the volume to mount
    mountPath: string;                      // Path inside the container to mount the volume
};

export type Volume = {
    name: string;                           // Name of the volume
    configMap?: ConfigMapVolumeSource;      // Volume source from a Kubernetes ConfigMap (optional)
    persistentVolumeClaim?: PVC;
};

export type PVC = {
    claimName: string;
}

export type ConfigMapVolumeSource = {
    name: string;                           // Name of the ConfigMap
};

export type DeploymentStrategy = {
    type: string;                           // Type of deployment strategy (e.g., "Recreate", "RollingUpdate")
    rollingUpdate?: RollingUpdateDeployment;// Rolling update configuration (optional)
};

export type RollingUpdateDeployment = {
    maxUnavailable?: number | string;       // Max unavailable pods during update (optional)
    maxSurge?: number | string;             // Max surge of pods during update (optional)
};
