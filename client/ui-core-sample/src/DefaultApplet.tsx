import * as React from "react";
import IAppProps from "@navish/ui-core/lib/app/component/IAppletProps";
import { AppWrapper } from "@navish/ui-core/lib/app/component/AppWrapper";

class DefaultApplet extends React.Component<IAppProps, any> {
    render() {
        const farItems = [
            { path: "/error/sample" },
            { path: "/user/profile/menuItem"}
        ];
        return (
            <AppWrapper title="Hello" farItems={farItems}>
                <div style={{ padding: 8 }}>
                    We're at {this.props.host.path}
                </div>
            </AppWrapper>
        );
    }
}

export { DefaultApplet }