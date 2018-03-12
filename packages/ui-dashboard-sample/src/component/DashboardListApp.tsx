import * as React from "react";
import { IAppHost } from "@twii/core/lib/app/IAppHost";
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
    render() {
        const title = <DashboardListMenuButton dashboardList={DashboardListStore} />;
        const styles : IAppViewStyles = {
            root: {
                backgroundColor: getTheme().palette.neutralTertiary
            }
        };
        return (
            <AppHostView host={this.props.host} title={title} styles={styles}>
                <DashboardListContainer dashboardList={DashboardListStore} host={this.props.host} />
            </AppHostView>
        );
    }
}

export { DashboardListApp }