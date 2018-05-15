import * as React from "react";
import { DashboardWrapper } from "@twii/bored/lib/component/DashboardWrapper";
import { IDashboardStyles } from "@twii/bored/lib/component/Dashboard.styles";
import { getTheme } from "@uifabric/styling";
import { IAppProps } from "@twii/core-ui/lib/component/IAppProps";
import { createSampleRouter } from "../../sampleRouter";

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
                        path: "/samples/fabric/textfield"
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
                border: `1px solid ${getTheme().palette.themeDark}`
            }
        };
        return (
            <div style={{ position: "absolute", top: 20, right: 20, bottom: 20, left: 20 }}>
                <DashboardWrapper host={this.props.host} config={dashboardConfig} styles={customStyles} router={dashboardRouter} addApp={{ path: "/samples" }} />
            </div>
        );
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
                        path: "/samples/fabric/textfield"
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
                border: `1px solid ${getTheme().palette.themeDark}`
            }
        };
        return (
            <div style={{ position: "absolute", top: 20, right: 20, bottom: 20, left: 20 }}>
                <DashboardWrapper host={this.props.host} config={dashboardConfig} styles={customStyles} router={dashboardRouter} />
            </div>
        );
    }
}

class VSplitSample extends React.Component<IAppProps, any> {
    render() {
        const dashboardConfig = {
            type: "dashboard",
            component: {
                type: "vsplit",
                offset: 0.5,
                top: {
                    component: {
                        type: "window",
                        path: "/samples/fabric/textfield"
                    }
                },
                bottom: {
                    component: {
                        type: "window",
                        path: "/samples/fabric/picker"
                    }
                }
            }
        };
        const customStyles : IDashboardStyles = {
            root: {
                border: `1px solid ${getTheme().palette.themeDark}`
            }
        };
        return (
            <div style={{ position: "absolute", top: 10, right: 10, bottom: 10, left: 10 }}>
                <DashboardWrapper host={this.props.host} config={dashboardConfig} styles={customStyles} router={dashboardRouter} />
            </div>
        );
    }
}

export { StackSample, HSplitSample, VSplitSample }