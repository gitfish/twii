import * as React from "react";
import { IAppHost } from "@twii/core/lib/app/IAppHost";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { AppHostView } from "@twii/ui-core/lib/app/component/AppHostView";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { DashboardListContainer } from "@twii/ui-dashboard/lib/component/DashboardList";
import { DashboardListStore } from "../DashboardListStore";
import { DashboardListMenuButton } from "@twii/ui-dashboard/lib/component/DashboardListMenuButton";
import { IAppViewStyles } from "@twii/ui-core/lib/app/component/AppView.styles";
import { getTheme } from "@uifabric/styling";

class DashboardListApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        DashboardListStore.load();
    }
    componentDidMount() {
        this.props.host.setTitle("Dashboards");
    }
    private _onAppMenuOpenChanged = () => {
        DashboardListStore.emit({ type: "resize" });
    }
    render() {
        const title = <DashboardListMenuButton dashboardList={DashboardListStore} />;
        const items : IContextualMenuItem[] = [
            {
                key: "addDashboard",
                name: "Add Dashboard",
                iconProps: { iconName: "Add" }
            }
        ];
        return (
            <AppHostView host={this.props.host} title={title} menuProps={{ items: items, onOpenChange: this._onAppMenuOpenChanged }}>
                <DashboardListContainer dashboardList={DashboardListStore} host={this.props.host} />
            </AppHostView>
        );
    }
}

export { DashboardListApp }