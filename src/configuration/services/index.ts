import { KubernetesObject } from "../../types";
import { configureCoreDB } from "./coreDB";
import { configureGrafana } from "./grafana";
import { configurePrometheus } from "./prometheus";

export function configureServices(clientId: string): KubernetesObject[] {
    return [
        configureCoreDB(clientId),
        configurePrometheus(clientId),
        configureGrafana(clientId),
    ];
}