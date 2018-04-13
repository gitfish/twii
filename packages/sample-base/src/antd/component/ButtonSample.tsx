import * as React from "react";
import Button from "antd/lib/button/index";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

class ButtonSamples extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <div><Button type="primary">Primary</Button></div>
                <div><Button>Default</Button></div>
                <div><Button type="dashed">Dashed</Button></div>
                <div><Button type="danger">Danger</Button></div>
            </div>
        );
    }
}

class ButtonSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Antd Button Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <ButtonSamples />
            </SampleHostAppView>
        );
    }
}

export { ButtonSampleApp }

