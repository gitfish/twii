import * as React from "react";
import { observer } from "mobx-react"; 
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { DashboardListContainer } from "./DashboardList";
import { createCommandBarMenuItem } from "./DashboardMenuHelper";
import { createDashboardListMenu, createDashboardListLayoutActions } from "./DashboardLayoutMenuHelper";
import { IHostAppViewProps } from "@twii/common/lib/component/HostAppView";
import { IDashboardList } from "../model/IDashboardList";

interface IDashboardListAppViewProps extends IHostAppViewProps {
    dashboardList: IDashboardList;
}

@observer
class DashboardListCommandBar extends React.Component<IDashboardListAppViewProps, any> {
    render() {
        const { dashboardList } = this.props;
        const items : IContextualMenuItem[] = [
            createCommandBarMenuItem(dashboardList)
        ];
        const layoutItem = createDashboardListMenu(dashboardList);
        if(layoutItem) {
            items.push(layoutItem);
        }
        const actionItems = createDashboardListLayoutActions(dashboardList);
        if(actionItems) {
            actionItems.forEach(i => items.push(i));
        }
        const commandBarProps = Object.assign({}, this.props.commandBarProps);
        commandBarProps.items = commandBarProps.items ? commandBarProps.items.concat(items) : items;
        return <CommandBar {...commandBarProps} />;
    }
}

class DashboardListAppView extends React.Component<IDashboardListAppViewProps, any> {
    componentWillMount() {
        this.props.dashboardList.load();
    }
    private _onRenderMenu = () => {
        return <DashboardListCommandBar {...this.props} />;
    }
    render() {
        return (
            <HostAppView {...this.props} onRenderMenu={this._onRenderMenu}>
                <DashboardListContainer dashboardList={this.props.dashboardList} host={this.props.host} />
                {this.props.children}
            </HostAppView>
        );
    }
}

export { IDashboardListAppViewProps, DashboardListAppView }