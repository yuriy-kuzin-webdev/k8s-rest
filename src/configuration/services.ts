import { Service } from "../types/Service";
import { configureCoreDbService } from "./core-db/coredb.service";
import { configurePrometheusService } from "./prometheus/prometheus.service";


export function configureServices(clientId: string): Service[] {
    return [
        // TODO code duplicated
        configureCoreDbService(clientId),
        configurePrometheusService(clientId),
    ];
}
