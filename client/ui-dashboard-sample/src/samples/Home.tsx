import * as React from "react";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { AppHostWrapper } from "@twii/ui-core/lib/app/component/AppHostWrapper";
import { AppLink } from "@twii/ui-core/lib/app/component/AppLink";

class HomeApp extends React.Component<IAppProps, any> {
    render() {
        const farItems = [
            { path: "/error/sample" },
            { path: "/user/profile/menuItem"}
        ];
        return (
            <AppHostWrapper host={this.props.host} title="Example App Home" farItems={farItems}>
                <div style={{ padding: 8 }}>
                    <h3>Example App Home</h3>
                    <ul>
                        <li><AppLink host={this.props.host} request={{ path: "/samples/form" }}>Form</AppLink></li>
                        <li><AppLink host={this.props.host} request={{ path: "/samples/package" }}>Package Info</AppLink></li>
                    </ul>
                </div>
            </AppHostWrapper>
        );
    }
}

export { HomeApp }