import * as React from "react";
import IAppletProps from "@twii/ui-core/lib/app/component/IAppProps";
import { AppWrapper } from "@twii/ui-core/lib/app/component/AppWrapper";
import { AppLink } from "@twii/ui-core/lib/app/component/AppLink";

class HomeApplet extends React.Component<IAppletProps, any> {
    render() {
        const farItems = [
            { path: "/error/sample" },
            { path: "/user/profile/menuItem"}
        ];
        return (
            <AppWrapper title="Example App Home" farItems={farItems}>
                <div style={{ padding: 8 }}>
                    <h3>Example App Home</h3>
                    <ul>
                        <li><AppLink host={this.props.host} request={{ path: "/samples/form" }}>Form</AppLink></li>
                    </ul>
                </div>
            </AppWrapper>
        );
    }
}

export { HomeApplet }