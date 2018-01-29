import * as React from "react";
import { observer } from "mobx-react";
import IDashboard from "../IDashboard";
import IDashboardList from "../IDashboardList";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import IDashboardAddModel from "../IDashboardAddModel";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { isBlank, isNotBlank } from "util/String";
import { KeyCodes } from "office-ui-fabric-react/lib/Utilities";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import "./DashboardAdd.scss";

interface IDashboardPropertyEditorProps {
    dashboard: IDashboard;
}

@observer
class DashboardPropertyEditor extends React.Component<IDashboardPropertyEditorProps, any> {
    _handleTitleChange = (text : string) => {
        this.props.dashboard.setTitle(text);
    }
    render() {
        return (
            <div className="dashboard-property-editor">
                <TextField label="Title" value={this.props.dashboard.title || ""} onChanged={this._handleTitleChange} />
            </div>
        );
    }
}

interface IDashboardAddProps {
    add: IDashboardAddModel
}

@observer
class DashboardAddFormActions extends React.Component<IDashboardAddProps, any> {
    private _onClickCancel = () => {
        this.props.add.cancel();
    }
    private _onClickSave = () => {
        this.props.add.save();
    }
    render() {
        return (
            <div className="dashboard-add-form-actions">
                <DefaultButton className="dashboard-form-action" onClick={this._onClickCancel}>Cancel</DefaultButton>
                <PrimaryButton className="dashboard-form-action" onClick={this._onClickSave} disabled={!this.props.add.saveEnabled}>OK</PrimaryButton>
            </div>
        )
    }
}

@observer
class ExistingDashboardSelector extends React.Component<IDashboardAddProps, any> {
    private _onChange = (option : IDropdownOption) => {
        const dashboard = this.props.add.dashboardList.dashboards.find(db => db.id === option.key);
        if(dashboard) {
            this.props.add.setExisting(dashboard);
        }
    }
    render() {
        if(this.props.add.dashboardList.dashboardCount > 0) {
            const options : IDropdownOption[] = this.props.add.dashboardList.dashboards.map(db => {
                return  {
                    key: db.id,
                    text: db.title
                };
            });
            return <Dropdown label="From Existing" options={options} onChanged={this._onChange} selectedKey={this.props.add.existing ? this.props.add.existing.id : undefined} />;
        }
        return null;
    }
}

@observer
class DashboardAddForm extends React.Component<IDashboardAddProps, any> {
    private _onKeyDown = (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.which === KeyCodes.enter && this.props.add.saveEnabled) {
            this.props.add.save();
        }
    }
    private _onMakeActiveChange = (e, checked) => {
        this.props.add.setMakeActive(checked);
    } 
    render() {
        if(this.props.add.active) {
            return (
                <div className="dashboard-add-form">
                    <DashboardPropertyEditor dashboard={this.props.add.dashboard} />
                    <ExistingDashboardSelector {...this.props} />
                    <Checkbox label="Set Dashboard Active" onChange={this._onMakeActiveChange} checked={this.props.add.makeActive} />
                </div>
            );
        }
        return null;
    }
}

@observer
class DashboardAddPanel extends React.Component<IDashboardAddProps, any> {
    private _onRenderFooterContent = () => {
        return <DashboardAddFormActions {...this.props} />;
    }
    private _onRenderBody = () => {
        return <DashboardAddForm {...this.props} />;
    }
    private _onDismiss = () => {
        this.props.add.cancel();
    }
    render() {
        return (
            <Panel isOpen={this.props.add.active}
                   isLightDismiss={true}
                   onRenderFooterContent={this._onRenderFooterContent}
                   onRenderBody={this._onRenderBody}
                   headerText="Add Dashboard"
                   type={PanelType.medium}
                   onDismiss={this._onDismiss} />
        );
    }
}

export { DashboardAddPanel as default, DashboardAddPanel }