import { PersistentVolume } from "../types/PersistentVolume";
import { configureCoreDbPV } from "./core-db/coredb.pv";
import { configureGrafanaPV } from "./grafana/grafana.pv";
import { configurePrometheusPV } from "./prometheus/prometheus.pv";


export function configurePVs(clientId: string): PersistentVolume[] {
    return [
        configureCoreDbPV(clientId),
        configureGrafanaPV(clientId),
        configurePrometheusPV(clientId),
    ];
}
