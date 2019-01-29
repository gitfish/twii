import * as React from "react";
import { observer } from "mobx-react";
import { IDashboardList } from "../model/IDashboardList";
import { Dashboard } from "./Dashboard";
import { Sync } from "@twii/common/lib/component/Sync";
import { DashboardAddPanel } from "./DashboardAdd";
import { DashboardAddStore } from "../model/DashboardAddStore";
import { DashboardRemoveDialog } from "./DashboardRemove";
import { DashboardRemoveStore } from "../model/DashboardRemoveStore";
import { DashboardListClearStore } from "../model/DashboardListClearStore";
import { IEventTarget } from "@twii/common/lib/IEventEmitter";
import { IDashboardStyles } from "./Dashboard.styles";
import { IDashboardListStyles, getStyles } from "./DashboardList.styles";
import { getClassNames } from "./DashboardList.classNames";
import { DashboardListClearDialog } from "./DashboardListClear";

interface IDashboardListProps {
    dashboardList: IDashboardList;
    host?: IEventTarget;
    styles?: IDashboardListStyles;
    className?: string;
    dashboardStyles?: IDashboardStyles;
}

@observer
class DashboardList extends React.Component<IDashboardListProps, any> {
    componentWillUnmount() {
        this.props.dashboardList.close();
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const active = this.props.dashboardList.active;
        const dashboards = this.props.dashboardList.dashboards.map(db => {
            return <Dashboard key={db.id} hidden={db !== active} dashboard={db} host={this.props.host} styles={this.props.dashboardStyles} />
        });
        return (
            <div className={classNames.root}>
                <DashboardAddPanel add={DashboardAddStore} />
                <DashboardRemoveDialog supplier={DashboardRemoveStore} />
                <DashboardListClearDialog supplier={DashboardListClearStore} />
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