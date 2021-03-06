import * as React from "react";
import { observer } from "mobx-react";
import { IDashboardList } from "../model/IDashboardList";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import { Sync } from "@twii/common/lib/component/Sync";
import { createMenuItems } from "./DashboardMenuHelper";

interface IDashboardListMenuButtonProps {
    dashboardList: IDashboardList;
}

@observer
class DashboardListMenuButton extends React.Component<IDashboardListMenuButtonProps, any> {
    render() {
        const items = createMenuItems(this.props.dashboardList);
        const active = this.props.dashboardList.active;
        const title = active ? active.title : "Dashboards";
        const menuProps : IContextualMenuProps = {
            items: items
        };
        return (
            <DefaultButton className="dashboard-list-menu-button app-menu-button" menuProps={menuProps}>{title}</DefaultButton>
        );
    }
}

class DashboardListMenuButtonContainer extends React.Component<IDashboardListMenuButtonProps, any> {
    private _onRenderSync = () => {
        return <DefaultButton className="dashboard-list-menu-button app-menu-button">Loading...</DefaultButton>
    }
    private _onRenderDone = () => {
        return <DashboardListMenuButton {...this.props} />
    }
    private _onRenderError = () => {
        return <DefaultButton className="dashboard-list-menu-button app-menu-button error">Error</DefaultButton>
    }
    render() {
        return <Sync sync={this.props.dashboardList.sync} onRenderSync={this._onRenderSync} onRenderDone={this._onRenderDone} />;
    }
}

export { IDashboardListMenuButtonProps, DashboardListMenuButtonContainer, DashboardListMenuButton }