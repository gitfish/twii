import { IDashboardList } from "./IDashboardList";
import { IDashboard } from "./IDashboard";
interface IDashboardRemoveOptions {
    dashboardList: IDashboardList;
    dashboard?: IDashboard;
}
interface IDashboardRemoveModel {
    active: boolean;
    dashboardList: IDashboardList;
    dashboard: IDashboard;
    init(opts: IDashboardRemoveOptions): void;
    save(): void;
    cancel(): void;
}
export { IDashboardRemoveOptions, IDashboardRemoveModel };
