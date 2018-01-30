import * as React from "react";
import { IAppHost } from "@twii/core/lib/app/IAppHost";
import { AppWrapper } from "@twii/ui-core/lib/app/component/AppWrapper";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { DashboardListContainer } from "./DashboardList";
import { DashboardListStore } from "../DashboardListStore";
import { DashboardListMenuButton } from "./DashboardListMenuButton";

class DashboardListApplet extends React.Component<IAppProps, any> {
    componentWillMount() {
        DashboardListStore.load();
    }
    componentDidMount() {
        this.props.host.setTitle("Dashboards");
    }
    render() {
        const title = <DashboardListMenuButton dashboardList={DashboardListStore} />;
        const farItems = [
            { path: "/dashboard/layout" }
        ];
        return (
            <AppWrapper className="dashboard-list-applet" title={title} farItems={farItems}>
                <DashboardListContainer dashboardList={DashboardListStore} host={this.props.host} />
            </AppWrapper>
        );
    }
}

export { DashboardListApplet as default, DashboardListApplet }