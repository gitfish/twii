import { action, IAction } from "mobx";
import { IDashboardAddOptions } from "./model/IDashboardAdd";
import { DashboardAddStore } from "./model/DashboardAddStore";
import { IDashboardRemoveOptions } from "./model/IDashboardRemove";
import { DashboardRemoveStore } from "./model/DashboardRemoveStore";

const addDashboard = action((opts : IDashboardAddOptions) => {
    DashboardAddStore.init(opts);
});

const removeDashboard = action((opts : IDashboardRemoveOptions) => {
    DashboardRemoveStore.init(opts);
});

export { addDashboard, removeDashboard }