import * as React from "react";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { AppHostView } from "@twii/ui-core/lib/app/component/AppHostView";
import { AppLink } from "@twii/ui-core/lib/app/component/AppLink";

class AppListApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Add App");
    }
    render() {
        return (
            <AppHostView host={this.props.host} title="Add App">
                <div style={{ padding: 8 }}>
                    <h3>Add App</h3>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <ul>
                            <li>
                                <AppLink host={this.props.host} request={{ path: "/samples/form", replace: true }}>Form Sample</AppLink>
                            </li>
                            <li>
                                <AppLink host={this.props.host} request={{ path: "/samples/picker", replace: true }}>Picker Sample</AppLink>
                            </li>
                            <li>
                                <AppLink host={this.props.host} request={{ path: "/samples/dashboard", replace: true }}>Dashboard Sample</AppLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </AppHostView>
        )
    }
}

export { AppListApp }