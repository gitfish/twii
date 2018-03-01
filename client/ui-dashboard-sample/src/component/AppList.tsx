import * as React from "react";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { AppHostWrapper } from "@twii/ui-core/lib/app/component/AppHostWrapper";
import { AppLink } from "@twii/ui-core/lib/app/component/AppLink";

class AppListApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Add App");
    }
    render() {
        return (
            <AppHostWrapper host={this.props.host} title="Add App">
                <div style={{ padding: 8 }}>
                    <h3>Add App</h3>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <ul>
                            <li>
                                <AppLink host={this.props.host} request={{ path: "/samples/form" }}>Form Sample</AppLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </AppHostWrapper>
        )
    }
}

export { AppListApp }