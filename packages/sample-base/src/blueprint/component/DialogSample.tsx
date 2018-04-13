import * as React from "react";
import { Dialog } from "@blueprintjs/core/lib/esm/components/dialog/dialog";
import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

interface IDialogSamplesState {
    open?: boolean;
}

class DialogSamples extends React.Component<any, IDialogSamplesState> {
    constructor(props : any) {
        super(props);
        this.state = { open: false };
    }
    private _onDialogClose = () => {
        console.log("-- On Dialog Close");
        this.setState({ open: false });
    }
    private _onClickOpenDialog = () => {
        console.log("-- On Click Open Dialog");
        this.setState({ open: true });
    }
    render() {
        return (
            <div style={{ padding: 8 }}>
                <Button onClick={this._onClickOpenDialog} disabled={this.state.open}>Show Dialog</Button>
                <Dialog isOpen={this.state.open} onClose={this._onDialogClose} title="Sample Dialog">
                    Hello, this is a dialog
                </Dialog>
            </div>
        );
    }
}

class DialogSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Dialog Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <DialogSamples />
            </SampleHostAppView>
        );
    }
}

export { DialogSampleApp }