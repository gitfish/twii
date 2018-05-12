import * as React from "react";
import { observer } from "mobx-react"; 
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { HostAppView } from "@twii/core-ui-fabric/lib/component/HostAppView";
import { IAppProps } from "@twii/core-ui/lib/component/IAppProps";
import { DashboardListContainer } from "@twii/bored/lib/component/DashboardList";
import { DashboardListStore } from "../model/DashboardListStore";
import { getTheme } from "@uifabric/styling";
import { addDashboard } from "@twii/bored/lib/DashboardActions";
import { createCommandBarMenuItem } from "@twii/bored/lib/component/DashboardMenuHelper";
import { createDashboardListMenu } from "@twii/bored/lib/component/DashboardLayoutMenuHelper";

@observer
class DashboardListApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        DashboardListStore.load();
    }
    render() {
        const items : IContextualMenuItem[] = [
            createCommandBarMenuItem(DashboardListStore)
        ];
        const farItems : IContextualMenuItem[] = [];
        const layoutItem = createDashboardListMenu(DashboardListStore);
        if(layoutItem) {
            farItems.push(layoutItem);
        };
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items, farItems: farItems }}>
                <DashboardListContainer dashboardList={DashboardListStore} host={this.props.host} dashboardStyles={{ root: { background: getTheme().palette.neutralTertiary }, content: { top: 0, right: 0, bottom: 0, left: 0 } }} />
            </HostAppView>
        );
    }
}

export { DashboardListApp }