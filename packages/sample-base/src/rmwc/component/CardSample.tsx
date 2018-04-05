import * as React from "react";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { SampleHostAppView } from "../../component/SampleHostAppView";
import { CardSample, MiniCardSample } from "@twii/rmwc-sample-base/lib/component/CardSample";

class CardSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("RMWC Card Samples");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ padding: 8 }}>
                        <h2>React Material Web Components Card Samples</h2>
                        <h3>Fully Featured</h3>
                        <div style={{ padding: 8 }}>
                            <CardSample />
                        </div>
                        <h3>Mini Card</h3>
                        <div style={{ padding: 8 }}>
                            <MiniCardSample />
                        </div>
                    </div>
                </div>
            </SampleHostAppView>
        );
    }
}

export { CardSampleApp }