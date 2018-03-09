import * as React from "react";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";
import { AppHostView } from "@twii/ui-core/lib/app/component/AppHostView";

class DefaultApp extends React.Component<IAppProps, any> {
    render() {
        /*
        const farItems = [
            { path: "/error/sample" },
            { path: "/user/profile/menuItem"}
        ];
        */
        return (
            <AppHostView host={this.props.host} title="Hello" /*farItems={farItems}*/>
                <div style={{ padding: 8 }}>
                    We're at {this.props.host.path}
                </div>
            </AppHostView>
        );
    }
}

export { DefaultApp }