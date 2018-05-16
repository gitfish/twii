import * as React from "react";
import { observer } from "mobx-react";
import { Dialog, DialogFooter, DialogContent } from "office-ui-fabric-react/lib/Dialog";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { IDashboardRemove } from "@twii/bored/lib/model/IDashboardRemove";

interface IDashboardRemoveProps {
    remove: IDashboardRemove;
}

@observer
class DashboardRemoveDialog extends React.Component<IDashboardRemoveProps, any> {
    private _onClickCancel = () => {
        this.props.remove.cancel();
    }
    private _onClickSave = () => {
        this.props.remove.save();
    }
    private _onDismissed = () => {
        this.props.remove.cancel();
    }
    render() {
        const footer = (
            <DialogFooter>
                <DefaultButton className="dashboard-form-action" onClick={this._onClickCancel}>Cancel</DefaultButton>
                <PrimaryButton className="dashboard-form-action" onClick={this._onClickSave}>OK</PrimaryButton>
            </DialogFooter>
        );
        return (
            <Dialog hidden={!this.props.remove.active}
                    onDismiss={this._onDismissed}
                    dialogContentProps={
                        {
                            title: this.props.remove.dashboard ? "Remove Dashboard" : "Remove All Dashboards",
                            subText: this.props.remove.dashboard ? `Are you sure you want to remove ${this.props.remove.dashboard.title}?` : "Are you sure you want to remove all dashboards?"
                        }   
                    }>
                {footer}
            </Dialog>
        )
    }
}

export { IDashboardRemoveProps, DashboardRemoveDialog }