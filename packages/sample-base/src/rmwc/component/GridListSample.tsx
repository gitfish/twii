import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { SampleHostAppView } from "../../component/SampleHostAppView";
import { GridListSample } from "@twii/rmwc-sample-base/lib/component/GridListSample";

class GridListSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("RMWC Grid List Samples");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <GridListSample />
            </SampleHostAppView>
        );
    }
}

export { GridListSampleApp }