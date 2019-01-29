import * as React from "react";
import { observer } from "mobx-react";
import { Dialog, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { IMutableSupplier } from "@twii/common/lib/IMutableSupplier";
import { IDashboard } from "../model/IDashboard";

interface IDashboardRemoveProps {
    supplier: IMutableSupplier<IDashboard>;
}

@observer
class DashboardRemoveDialog extends React.Component<IDashboardRemoveProps, any> {
    private _onClickCancel = () => {
        this.props.supplier.clearValue();
    }
    private _onClickSave = () => {
        this.props.supplier.value.removeFromParent();
        this.props.supplier.clearValue();
    }
    private _onDismissed = () => {
        this.props.supplier.clearValue();
    }
    render() {
        const footer = (
            <DialogFooter>
                <DefaultButton onClick={this._onClickCancel}>Cancel</DefaultButton>
                <PrimaryButton onClick={this._onClickSave}>OK</PrimaryButton>
            </DialogFooter>
        );

        return (
            <Dialog hidden={!this.props.supplier.value}
                    onDismiss={this._onDismissed}
                    dialogContentProps={
                        {
                            title: this.props.supplier.value ? "Remove Dashboard" : "",
                            subText: this.props.supplier.value ? `Are you sure you want to remove ${this.props.supplier.value.title}?` : ""
                        }   
                    }>
                {footer}
            </Dialog>
        )
    }
}

export { IDashboardRemoveProps, DashboardRemoveDialog }