import * as React from "react";
import { Dialog } from "@blueprintjs/core/lib/esm/components/dialog/dialog";
import { Button } from "@blueprintjs/core/lib/esm/components/button/buttons";

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

export { IDialogSamplesState, DialogSamples, DialogSamples as default }