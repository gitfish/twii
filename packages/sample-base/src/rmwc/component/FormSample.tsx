import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { HostAppView } from "@twii/common/lib/component/HostAppView";
import { TextFieldSamples } from "@twii/rmwc-sample-base/lib/component/FormSample";

class FormSampleApp extends React.Component<IAppProps, any> {
    render() {
        return (
            <HostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <h2>Text Field Samples</h2>
                    <div style={{ padding: 8 }}>
                        <TextFieldSamples />
                    </div>
                </div>
            </HostAppView>
        );
    }
}

export { FormSampleApp }