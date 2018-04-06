import * as React from "react";
import { Alert } from "@blueprintjs/core/lib/esm/components/alert/alert";
import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { SampleHostAppView } from "../../component/SampleHostAppView";

interface IAlertSamplesState {
    open?: boolean;
}

class AlertSamples extends React.Component<any, IAlertSamplesState> {
    constructor(props : any) {
        super(props);
        this.state = { open: false };
    }
    private _onAlertClose = () => {
        console.log("-- On Alert Close");
        this.setState({ open: false });
    }
    private _onClickOpenAlert = () => {
        console.log("-- On Click Open Alert");
        this.setState({ open: true });
    }
    render() {
        return (
            <div>
                <Button onClick={this._onClickOpenAlert} disabled={this.state.open}>Show Alert</Button>
                <Alert isOpen={this.state.open} onClose={this._onAlertClose}>
                    Hello, this is an alert
                </Alert>
            </div>
        );
    }
}

class AlertSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Alert Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <AlertSamples />
                </div>
            </SampleHostAppView>
        );
    }
}

export { AlertSampleApp }