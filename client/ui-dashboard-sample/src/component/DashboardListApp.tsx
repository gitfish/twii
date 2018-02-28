import * as React from "react";
import { IAppHost } from "@twii/core/lib/app/IAppHost";
import { AppWrapper } from "@twii/ui-core/lib/app/component/AppWrapper";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { DashboardListContainer } from "@twii/ui-dashboard/lib/component/DashboardList";
import { DashboardListStore } from "../DashboardListStore";
import { DashboardListMenuButton } from "@twii/ui-dashboard/lib/component/DashboardListMenuButton";

class DashboardListApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        DashboardListStore.load();
    }
    componentDidMount() {
        this.props.host.setTitle("Dashboards");
    }
    render() {
        const title = <DashboardListMenuButton dashboardList={DashboardListStore} />;

        return (
            <AppWrapper className="dashboard-list-applet" title={title}>
                <DashboardListContainer dashboardList={DashboardListStore} host={this.props.host} />
            </AppWrapper>
        );
    }
}

export { DashboardListApp }