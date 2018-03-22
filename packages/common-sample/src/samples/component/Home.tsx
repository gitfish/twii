import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { HostNavigationView } from "@twii/common/lib/component/HostNavigationView";
import { AppLink } from "@twii/common/lib/component/AppLink";

class Home extends React.Component<IAppProps, any> {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <h2>Sample App Home</h2>
                <ul>
                    <li><AppLink host={this.props.host} request={{ path: "/samples/form" }}>Form</AppLink></li>
                    <li><AppLink host={this.props.host} request={{ path: "/samples/picker" }}>Picker</AppLink></li>
                    <li><AppLink host={this.props.host} request={{ path: "/samples/personform" }}>Person Form</AppLink></li>
                </ul>
            </div>
        );
    }
}

export { Home }