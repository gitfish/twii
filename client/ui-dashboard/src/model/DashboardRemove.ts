import { observable, action, computed } from "mobx";
import { IDashboardList } from "./IDashboardList";
import { IDashboard } from "./IDashboard";
import { Dashboard } from "./Dashboard";
import { IDashboardRemove, IDashboardRemoveOptions } from "./IDashboardRemove";
import { isNotBlank } from "@twii/core/lib/common/StringUtils";

class DashboardRemove implements IDashboardRemove {
    @observable active : boolean = false;
    @observable dashboardList : IDashboardList;
    @observable dashboard : IDashboard;
    
    @action
    init(opts : IDashboardRemoveOptions) {
        this.dashboardList = opts.dashboardList;
        this.dashboard = opts.dashboard;
        this.active = true;
    }

    @action
    private _close() {
        //this.dashboardList = undefined;
        //this.dashboard = undefined;
        this.active = false;
    }

    @action
    save() {
        if(this.dashboard) {
            this.dashboardList.remove(this.dashboard);
        } else {
            this.dashboardList.clear();
        }
        this._close();
    }

    @action
    cancel() {
        this._close();
    }
}

export { DashboardRemove }