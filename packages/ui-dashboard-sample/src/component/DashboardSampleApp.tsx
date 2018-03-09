import * as React from "react";
import { DashboardWrapper } from "@twii/ui-dashboard/lib/component/DashboardWrapper";
import { IDashboardStyles } from "@twii/ui-dashboard/lib/component/Dashboard.styles";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { AppHostView } from "@twii/ui-core/lib/app/component/AppHostView";
import { getTheme } from "@uifabric/styling";

class DashboardSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Dashboard Sample");
    }
    render() {
        const dashboardConfig = {
            type: "dashboard",
            component: {
                type: "stack",
                windows: [
                    {
                        type: "window",
                        path: "/samples/form"
                    },
                    {
                        type: "window",
                        path: "/samples/picker"
                    }
                ]
            }
        };
        const customStyles : IDashboardStyles = {
            root: {
                backgroundColor: getTheme().palette.neutralLighter
            },
            content: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        };
        return (
            <AppHostView host={this.props.host} title="Dashboard Sample">
                <DashboardWrapper host={this.props.host} config={dashboardConfig} styles={customStyles} />
            </AppHostView>
        )
    }
}

export { DashboardSampleApp }