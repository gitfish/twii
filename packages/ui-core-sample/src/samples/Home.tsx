import * as React from "react";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { AppHostView } from "@twii/ui-core/lib/app/component/AppHostView";
import { AppLink } from "@twii/ui-core/lib/app/component/AppLink";

class HomeApp extends React.Component<IAppProps, any> {
    render() {
        /*
        const farItems = [
            { path: "/error/sample" },
            { path: "/user/profile/menuItem"}
        ];
        */
        return (
            <AppHostView host={this.props.host} title="Example App Home"/*farItems={farItems}*/>
                <div style={{ padding: 8 }}>
                    <h3>UI Core Sample App Home</h3>
                    <ul>
                        <li><AppLink host={this.props.host} request={{ path: "/samples/form" }}>Form</AppLink></li>
                    </ul>
                </div>
            </AppHostView>
        );
    }
}

export { HomeApp }