import * as React from "react";
import { observer } from "mobx-react";
import { IDashboardList } from "../model/IDashboardList";
import { IDashboard } from "../model/IDashboard";
import { Dashboard } from "./Dashboard";
import { Sync } from "@twii/ui-core/lib/common/component/Sync";
import { DashboardAddPanel } from "./DashboardAdd";
import { DashboardAddStore } from "../DashboardAddStore";
import { DashboardRemoveDialog } from "./DashboardRemove";
import { DashboardRemoveStore } from "../DashboardRemoveStore";
import { ComponentGlobals } from "../ComponentGlobals";
import { IEventTarget } from "@twii/core/lib/common/IEventEmitter";

interface IDashboardListProps {
    dashboardList: IDashboardList;
    host?: IEventTarget;
}

@observer
class DashboardList extends React.Component<IDashboardListProps, any> {
    componentWillUnmount() {
        this.props.dashboardList.close();
    }
    render() {
        const active = this.props.dashboardList.active;
        const dashboards = this.props.dashboardList.dashboards.map(db => {
            return <Dashboard key={db.id} hidden={db !== active} dashboard={db} host={this.props.host} />
        });
        return (
            <div className="dashboard-list">
                <DashboardAddPanel add={DashboardAddStore} />
                <DashboardRemoveDialog remove={DashboardRemoveStore} />
                {dashboards}
            </div>
        );
    }
}

class DashboardListContainer extends React.Component<IDashboardListProps, any> {
    private _onRenderDone = () => {
        return <DashboardList {...this.props} />
    }
    render() {
        return <Sync sync={this.props.dashboardList.sync} syncLabel="Loading Dashboards..." onRenderDone={this._onRenderDone} />;
    }
}

export { IDashboardListProps, DashboardListContainer, DashboardList }