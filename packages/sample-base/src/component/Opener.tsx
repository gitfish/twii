import * as React from "react";
import { AppLink } from "@twii/common-ui/lib/component/AppLink";
import { SampleHostAppView, IAppProps } from "./SampleHostAppView";

class OpenerApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Opener");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <AppLink host={this.props.host} request={{ path: "/samples/opener" }} open>Open Another Opener</AppLink>
                </div>
            </SampleHostAppView>
        );
    }
}

export { OpenerApp }