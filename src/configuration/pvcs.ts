import { PersistentVolumeClaim } from "../types/PersistentVolumeClaim";
import { configureCoreDbPVC } from "./core-db/coredb.pvc";
import { configureGrafanaPVC } from "./grafana/grafana.pvc";
import { configurePrometheusPVC } from "./prometheus/prometheus.pvc";


export function configurePVCs(clientId: string): PersistentVolumeClaim[] {
    return [
        configureCoreDbPVC(clientId),
        configureGrafanaPVC(clientId),
        configurePrometheusPVC(clientId),
    ];
}
