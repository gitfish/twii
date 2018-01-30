import { action, IAction } from "mobx";
import { IDashboard } from "./IDashboard";
import { IDashboardAddOptions } from "./IDashboardAddModel";
import { DashboardAddStore } from "./DashboardAddStore";
import { IDashboardRemoveOptions } from "./IDashboardRemoveModel";
import { DashboardRemoveStore } from "./DashboardRemoveStore";

const addDashboard = action((opts : IDashboardAddOptions) => {
    DashboardAddStore.init(opts);
});

const removeDashboard = action((opts : IDashboardRemoveOptions) => {
    DashboardRemoveStore.init(opts);
});

export { addDashboard, removeDashboard }