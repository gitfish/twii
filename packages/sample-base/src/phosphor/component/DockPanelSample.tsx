import * as React from "react";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";
import { DockPanelSample } from "@twii/phosphor-sample/lib/component/DockPanelSample";

class DockPanelSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Phosphor Dock Panel Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <DockPanelSample host={this.props.host} />
            </SampleHostAppView>
        );
    }
}

export { DockPanelSampleApp }