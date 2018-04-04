import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { SampleHostAppView } from "./SampleHostAppView";
import { AppLink } from "@twii/common/lib/component/AppLink";
import { List } from "office-ui-fabric-react/lib/List";

class Home extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Samples Home");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <h2>Samples Home</h2>
                    <ul>
                        <li><AppLink host={this.props.host} request={{ path: "/samples/form", replace: true }}>Form</AppLink></li>
                        <li><AppLink host={this.props.host} request={{ path: "/samples/picker", replace: true }}>Picker</AppLink></li>
                        <li><AppLink host={this.props.host} request={{ path: "/samples/personform", replace: true }}>Person Form</AppLink></li>
                        <li><AppLink host={this.props.host} request={{ path: "/samples/sticky", replace: true }}>Sticky</AppLink></li>
                        <li><AppLink host={this.props.host} request={{ path: "/samples/navigationview", replace: true}}>Navigation View</AppLink></li>
                    </ul>
                </div>
            </SampleHostAppView>
        );
    }
}

export { Home }