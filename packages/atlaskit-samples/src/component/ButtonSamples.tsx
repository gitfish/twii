import * as React from "react";
import Button from "@atlaskit/button/dist/esm/components/Button";
import Modal from "@atlaskit/modal-dialog/dist/esm/components/Modal";

interface IButtonSamplesState {
    dialogOpen?: boolean;
    dialogTitle?: string;
    dialogContent?: React.ReactNode;
}

class ButtonSamples extends React.Component<any, IButtonSamplesState> {
    constructor(props : any) {
        super(props);
        this.state = {}
    }
    private _onModalClose = () => {
        this.setState({
            dialogOpen: false,
            dialogTitle: null,
            dialogContent: null
        });
    }
    private _onClickDefault = () => {
        this.setState({
            dialogOpen: true,
            dialogTitle: "Default Button Clicked",
            dialogContent: "You clicked the Default Button"
        })
    }
    private _onClickDanger = () => {
        this.setState({
            dialogOpen: true,
            dialogTitle: "Danger Button Clicked",
            dialogContent: "You clicked the Danger Button"
        })
    }
    private _onClickPrimary = () => {
        this.setState({
            dialogOpen: true,
            dialogTitle: "Primary Button Clicked",
            dialogContent: "You Clicked the Primary Button"
        })
    }
    render() {
        let modal;
        if(this.state.dialogOpen) {
            const actions = [
                { text: "Close", onClick: this._onModalClose }
            ];
            modal = (
                <Modal actions={actions} onClose={this._onModalClose} heading={this.state.dialogTitle || "Modal Dialog"}>
                    {this.state.dialogContent}
                </Modal>
            );
        }
        return (
            <div style={{ padding: 8 }}>
                {modal}
                <Button appearance="default" onClick={this._onClickDefault}>Default</Button>
                <Button appearance="danger" onClick={this._onClickDanger}>Danger</Button>
                <Button appearance="primary" onClick={this._onClickPrimary}>Primary</Button>
            </div>
        );
    }
}

export { IButtonSamplesState, ButtonSamples, ButtonSamples as default }