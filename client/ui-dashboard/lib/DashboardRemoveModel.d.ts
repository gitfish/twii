import { IDashboardList } from "./IDashboardList";
import { IDashboard } from "./IDashboard";
import { IDashboardRemoveModel, IDashboardRemoveOptions } from "./IDashboardRemoveModel";
declare class DashboardRemoveModel implements IDashboardRemoveModel {
    active: boolean;
    dashboardList: IDashboardList;
    dashboard: IDashboard;
    init(opts: IDashboardRemoveOptions): void;
    private _close();
    save(): void;
    cancel(): void;
}
export { DashboardRemoveModel as default, DashboardRemoveModel };
