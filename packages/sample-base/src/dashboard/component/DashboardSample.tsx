import * as React from "react";
import { DashboardWrapper } from "@pu/dashboard/lib/component/DashboardWrapper";
import { IDashboardStyles } from "@pu/dashboard/lib/component/Dashboard.styles";
import { getTheme } from "@uifabric/styling";
import { createSampleRouter } from "../../sampleRouter";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

const dashboardRouter = createSampleRouter();

class StackSample extends React.Component<IAppProps, any> {
    render() {
        const dashboardConfig = {
            type: "dashboard",
            component: {
                type: "stack",
                windows: [
                    {
                        type: "window",
                        path: "/samples/fabric/form"
                    },
                    {
                        type: "window",
                        path: "/samples/fabric/picker"
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
                left: 20,
                border: `1px solid ${getTheme().palette.themeDark}`
            }
        };
        return <DashboardWrapper host={this.props.host} config={dashboardConfig} styles={customStyles} router={dashboardRouter} addApp={{ path: "/samples/home" }} />;
    }
}

class HSplitSample extends React.Component<IAppProps, any> {
    render() {
        const dashboardConfig = {
            type: "dashboard",
            component: {
                type: "hsplit",
                offset: 0.5,
                left: {
                    component: {
                        type: "window",
                        path: "/samples/fabric/form"
                    }
                },
                right: {
                    component: {
                        type: "window",
                        path: "/samples/fabric/picker"
                    }
                }
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
                left: 20,
                border: `1px solid ${getTheme().palette.themeDark}`
            }
        };
        return <DashboardWrapper host={this.props.host} config={dashboardConfig} styles={customStyles} router={dashboardRouter} />;
    }
}

class StackSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Stack Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <StackSample host={this.props.host} />
            </SampleHostAppView>
        );
    }
}

class HSplitSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("HSplit Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <HSplitSample host={this.props.host} />
            </SampleHostAppView>
        );
    }
}

export { StackSampleApp, HSplitSampleApp }