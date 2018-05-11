import * as React from "react";
import { DashboardWrapper } from "@twii/dashboard/lib/component/DashboardWrapper";
import { IDashboardStyles } from "@twii/dashboard/lib/component/Dashboard.styles";
import { getTheme } from "@uifabric/styling";
import { IAppProps } from "@twii/common-ui/lib/component/IAppProps";
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
                backgroundColor: getTheme().palette.neutralLighter
            },
            content: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
                border: `1px solid ${getTheme().palette.themeDark}`,
                background: getTheme().palette.themeDark
            }
        };
        return <DashboardWrapper host={this.props.host} config={dashboardConfig} styles={customStyles} router={dashboardRouter} addApp={{ path: "/samples" }} />;
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
                backgroundColor: getTheme().palette.neutralLighter
            },
            content: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
                border: `1px solid ${getTheme().palette.themeDark}`,
                background: getTheme().palette.themeDark
            }
        };
        return <DashboardWrapper host={this.props.host} config={dashboardConfig} styles={customStyles} router={dashboardRouter} />;
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
                backgroundColor: getTheme().palette.neutralLighter
            },
            content: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
                border: `1px solid ${getTheme().palette.themeDark}`,
                background: getTheme().palette.themeDark
            }
        };
        return <DashboardWrapper host={this.props.host} config={dashboardConfig} styles={customStyles} router={dashboardRouter} />;
    }
}

export { StackSample, HSplitSample, VSplitSample }