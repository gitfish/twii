import * as React from "react";
import { IAppHost } from "@twii/common/lib/IAppHost";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { HostNavigationView } from "@twii/common/lib/component/HostNavigationView";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { DashboardListContainer } from "@twii/dashboard/lib/component/DashboardList";
import { DashboardListStore } from "../DashboardListStore";
import { DashboardListMenuButton } from "@twii/dashboard/lib/component/DashboardListMenuButton";
import { INavigationViewStyles } from "@twii/common/lib/component/NavigationView.styles";
import { getTheme } from "@uifabric/styling";
import { addDashboard } from "@twii/dashboard/lib/DashboardActions";

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
        //const title = <DashboardListMenuButton dashboardList={DashboardListStore} />;
        const items : IContextualMenuItem[] = [
            {
                key: "addDashboard",
                name: "Add Dashboard",
                iconProps: { iconName: "Add" },
                onClick: () => {
                    addDashboard({ dashboardList: DashboardListStore })
                }
            }
        ];
        return (
            <HostNavigationView host={this.props.host} title="Dashboards" menuProps={{ items: items, onOpenChange: this._onAppMenuOpenChanged }}>
                <DashboardListContainer dashboardList={DashboardListStore} host={this.props.host} dashboardStyles={{ root: { background: getTheme().palette.neutralTertiary }, content: { top: 0, right: 0, bottom: 0, left: 0 } }} />
            </HostNavigationView>
        );
    }
}

export { DashboardListApp }