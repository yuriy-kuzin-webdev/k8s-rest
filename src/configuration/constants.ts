export const CONFIGMAP_API_VERSION = "v1";
export const DEPLOYMENT_API_VERSION = "apps/v1";
export const NAMESPACE_API_VERSION = "v1";

export const COREDB = {
    CONFIGMAP_API_VERSION,
    DEPLOYMENT_API_VERSION,
    IMAGE: "postgres:16",
    SERVICE_NAME: "postgresql",
}

export const PROMETHEUS = {
    CONFIGMAP_API_VERSION,
    DEPLOYMENT_API_VERSION,
    IMAGE: "prom/prometheus:v2.53.2",
    PROM_CONFIG: "prometheus-config",
    SERVICE_NAME: "prometheus",
}
