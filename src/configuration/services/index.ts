import { Deployment } from "../../types/Deployment";
import { configureCoreDB } from "./coreDB";
import { configureGrafana } from "./grafana";
import { configurePrometheus } from "./prometheus";


export function configureServices(clientId: string): Deployment[] {
    return [
        configureCoreDB(clientId),
        configurePrometheus(clientId),
        configureGrafana(clientId),
    ];
}
