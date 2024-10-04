export const CONFIGMAP_API_VERSION = "v1";
export const DEPLOYMENT_API_VERSION = "apps/v1";
export const NAMESPACE_API_VERSION = "v1";
export const SERVICE_API_VERSION = "v1";


export const COREDB = {
    CONFIGMAP_API_VERSION,
    DEPLOYMENT_API_VERSION,
    IMAGE: "postgres:16",
    PORT: 5432,
    SERVICE_API_VERSION,
    SERVICE_NAME: "postgresql",
}

export const GRAFANA = {
    DEPLOYMENT_API_VERSION,
    IMAGE: "grafana/grafana:10.4.10",
    PORT: 3000,
    SERVICE_API_VERSION,
    SERVICE_NAME: "grafana",
}

export const PROMETHEUS = {
    CONFIGMAP_API_VERSION,
    DEPLOYMENT_API_VERSION,
    IMAGE: "prom/prometheus:v2.53.2",
    PORT: 9090,
    PROM_CONFIG: "prometheus-config",
    SERVICE_API_VERSION,
    SERVICE_NAME: "prometheus",
}
