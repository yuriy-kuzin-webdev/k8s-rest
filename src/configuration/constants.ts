export const CONFIGMAP_API_VERSION = "v1";
export const DEPLOYMENT_API_VERSION = "apps/v1";
export const NAMESPACE_API_VERSION = "v1";
export const PV_API_VERSION = "v1";
export const PVC_API_VERSION = "v1";
export const SERVICE_API_VERSION = "v1";


const base = {
    CONFIGMAP_API_VERSION,
    DEPLOYMENT_API_VERSION,
    PV_API_VERSION,
    PVC_API_VERSION,
    SERVICE_API_VERSION,
}

export const COREDB = {
    ...base,
    IMAGE: "postgres:16",
    PORT: 5432,
    SERVICE_API_VERSION,
    SERVICE_NAME: "postgresql",
}

export const GRAFANA = {
    ...base,
    IMAGE: "grafana/grafana:10.4.10",
    PORT: 3000,
    GRAFANA_CONFIG: "grafana-config",
    SERVICE_API_VERSION,
    SERVICE_NAME: "grafana",
}

export const PROMETHEUS = {
    ...base,
    IMAGE: "prom/prometheus:v2.53.2",
    PORT: 9090,
    PROM_CONFIG: "prometheus-config",
    SERVICE_API_VERSION,
    SERVICE_NAME: "prometheus",
}
