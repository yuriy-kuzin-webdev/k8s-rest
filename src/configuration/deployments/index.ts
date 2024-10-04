import { Deployment } from "../../types/Deployment";
import { configureCoreDB } from "./coreDB";
import { configureGrafana } from "./grafana";
import { configurePrometheus } from "./prometheus";


export function configureDeployments(clientId: string): Deployment[] {
    return [
        configureCoreDB(clientId),
        configurePrometheus(clientId),
        configureGrafana(clientId),
    ];
}
