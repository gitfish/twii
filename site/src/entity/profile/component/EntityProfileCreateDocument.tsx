import * as React from "react";
import { observer } from "mobx-react";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import IEntityProfileCreateDocumentModel from "../IEntityProfileCreateDocumentModel";
import EntityProfileTemplateList from "../EntityProfileTemplateList";

interface IEntityProfileCreateDocumentProps {
    model: IEntityProfileCreateDocumentModel;
}

@observer
class EntityProfileCreateDocument extends React.Component<IEntityProfileCreateDocumentProps, any> {
    private _onChanged = (option) => {
        const e = EntityProfileTemplateList.find(e => e.key === option.key);
        this.props.model.setSelectedTemplate(e);
    }
    render() {
        const options : IDropdownOption[] = [
            {
                key: "empty",
                text: ""
            }
        ];
        EntityProfileTemplateList.forEach(e => {
            options.push({
                key: e.key,
                text: e.name
            });
        });
        return (
            <div className="entity-profile-create-document">
                <Dropdown
                    label="Document Template"
                    ariaLabel="Document Template"
                    onChanged={this._onChanged}
                    options={options}
                    selectedKey={this.props.model.selectedTemplate ? this.props.model.selectedTemplate.key : undefined} />
            </div>
        );
    }
}

@observer
class EntityProfileCreateDocumentDialog extends React.Component<IEntityProfileCreateDocumentProps, any> {
    private _onDismiss = () => {
        this.props.model.cancel();
    }
    private _onCancelClick = () => {
        this.props.model.cancel();
    }
    private _onCreateDocumentClick = () => {
        this.props.model.createDocument();
    }
    render() {
        let content;
        let footer;
        if(this.props.model.active) {
            content = <EntityProfileCreateDocument {...this.props} />;
            footer = (
                <DialogFooter>
                    <DefaultButton disabled={this.props.model.createDocumentSync.syncing} onClick={this._onCancelClick} text="Cancel" />
                    <PrimaryButton disabled={!this.props.model.selectedTemplate || this.props.model.createDocumentSync.syncing ? true : false} onClick={this._onCreateDocumentClick} text="Create" />
                </DialogFooter>
            );
        }
        return (
            <Dialog
                hidden={!this.props.model.active}
                dialogContentProps={
                    {
                        type: DialogType.normal,
                        title: "Entity Profile - Create Document",
                        subText: "Create an Entity Profile Document based on a template"
                    }
                }
                onDismiss={this._onDismiss}>
                {content}
                {footer}
            </Dialog>
        );
    }
}

export { EntityProfileCreateDocumentDialog }

