import { Deployment } from "../types/Deployment";
import { configureCoreDB } from "./core-db/coredb.deployment";
import { configureGrafana } from "./grafana/grafana.deployment";
import { configurePrometheus } from "./prometheus/prometheus.deployment";


export function configureDeployments(clientId: string): Deployment[] {
    return [
        configureCoreDB(clientId),
        configurePrometheus(clientId),
        configureGrafana(clientId),
    ];
}
