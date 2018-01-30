import { IAction } from "mobx";
import { IDashboardAddOptions } from "./IDashboardAddModel";
import { IDashboardRemoveOptions } from "./IDashboardRemoveModel";
declare const addDashboard: ((opts: IDashboardAddOptions) => void) & IAction;
declare const removeDashboard: ((opts: IDashboardRemoveOptions) => void) & IAction;
export { addDashboard, removeDashboard };
