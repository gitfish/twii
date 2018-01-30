import { IDashboardList } from "./IDashboardList";
import { IDashboard } from "./IDashboard";
import { IDashboardAddModel, IDashboardAddOptions } from "./IDashboardAddModel";
declare class DashboardAddModel implements IDashboardAddModel {
    active: boolean;
    dashboardList: IDashboardList;
    existing: IDashboard;
    dashboard: IDashboard;
    makeActive: boolean;
    init(opts: IDashboardAddOptions): void;
    setExisting(existing: IDashboard): void;
    setMakeActive(makeActive: boolean): void;
    private _close();
    readonly saveEnabled: boolean;
    save(): void;
    cancel(): void;
}
export { DashboardAddModel as default, DashboardAddModel };
