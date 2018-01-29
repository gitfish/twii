import * as React from "react";
import IAppHost from "app/IAppHost";
import AppWrapper from "app/component/AppWrapper";
import AppContainer from "app/component/AppContainer";
import { DashboardListContainer } from "./DashboardList";
import DashboardListStore from "../DashboardListStore";
import DashboardListMenuButton from "./DashboardListMenuButton";

interface IDashboardListAppletProps {
    host: IAppHost;
}

class DashboardListApplet extends React.Component<IDashboardListAppletProps, any> {
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