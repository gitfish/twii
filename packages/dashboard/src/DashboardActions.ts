import { action, IAction } from "mobx";
import { IDashboardAddOptions } from "./model/IDashboardAdd";
import { DashboardAddStore } from "./model/DashboardAddStore";
import { DashboardRemoveStore } from "./model/DashboardRemoveStore";
import { IDashboard } from "./model/IDashboard";
import { DashboardListClearStore } from "./model/DashboardListClearStore";
import { IDashboardList } from "./model/IDashboardList";

const addDashboard = action((opts : IDashboardAddOptions) => {
    DashboardAddStore.init(opts);
});

const removeDashboard = action((dashboard : IDashboard) => {
    DashboardRemoveStore.value = dashboard;
});

const clearDashboards = action((dashboardList : IDashboardList) => {
    DashboardListClearStore.value = dashboardList;
});

export { addDashboard, removeDashboard, clearDashboards }