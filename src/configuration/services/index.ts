import { Service } from "../../types/Service";
import { configureCoreDbService } from "./coreDB";
import { configurePrometheusService } from "./prometheus";


export function configureServices(clientId: string): Service[] {
    return [
        // TODO code duplicated
        configureCoreDbService(clientId),
        configurePrometheusService(clientId),
    ];
}
