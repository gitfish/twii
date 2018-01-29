import * as React from "react";
import { observer } from "mobx-react";
import IEntityProfileListModel from "../IEntityProfileListModel";
import EntityProfile from "./EntityProfile";
import DragStore from "common/DragStore";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { EntityProfileCreateDocumentDialog } from "./EntityProfileCreateDocument";
import EntityProfileCreateDocumentStore from "../EntityProfileCreateDocumentStore";
import ClipboardStore from "common/ClipboardStore";

interface IEntityProfileListProps {
    profileList: IEntityProfileListModel;
}

@observer
class EntityProfileListCommandBar extends React.Component<IEntityProfileListProps, any> {
    private _onClearClick = () => {
        this.props.profileList.clear();
    }
    private _onPasteClick = () => {
        const value = ClipboardStore.value.value;
        this.props.profileList.addEntitySourceItems(value);
        ClipboardStore.clearValue();
    }
    private _onCreateDocumentClick = () => {
        EntityProfileCreateDocumentStore.init({ profileList: this.props.profileList });
    }
    render() {
        const items : IContextualMenuItem[] = [];
        const farItems : IContextualMenuItem[] = [];

        items.push({
            key: "createDocument",
            name: "Create Document",
            iconProps: { iconName: "WordDocument" },
            onClick: this._onCreateDocumentClick,
            disabled: this.props.profileList.profiles.length === 0
        });
        
        farItems.push({
            key: "paste",
            name: "Paste",
            title: "Paste from Clipboard",
            iconProps: { iconName: "Paste" },
            onClick: this._onPasteClick,
            disabled: !ClipboardStore.value || ClipboardStore.value.type !== "entitySourceItems"
        });

        farItems.push({
            key: "clear",
            name: "Clear",
            title: "Clear Profile",
            iconProps: { iconName: "Clear" },
            onClick: this._onClearClick,
            disabled: this.props.profileList.profiles.length === 0
        });
        
        return items.length > 0 || farItems.length > 0 ?
            <CommandBar className="entity-profile-list-command-bar" items={items} farItems={farItems} /> : null;
    }
}

@observer
class EntityProfileList extends React.Component<IEntityProfileListProps, any> {
    private _onDragOver = (e : React.DragEvent<HTMLDivElement>) => {
        // TODO: cleanup - needs to move to constant
        if(DragStore.value && DragStore.value.type === "entitySourceItems") {
            e.preventDefault();
        }
    }
    private _onDrop = (e : React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const value = DragStore.value.value;
        this.props.profileList.addEntitySourceItems(value);
    }
    render() {
        let content;
        if(this.props.profileList.profiles.length > 0) {
            content = this.props.profileList.profiles.map(item => {
                return <EntityProfile key={item.entity.masterEntityId} profile={item} />;
            });
        } else {
            content = <MessageBar messageBarType={MessageBarType.info}>No items have been added to the clipboard</MessageBar>;
        }
        return (
            <div className="entity-profile-list" onDragOver={this._onDragOver} onDrop={this._onDrop}>
                <EntityProfileListCommandBar {...this.props} />
                <EntityProfileCreateDocumentDialog model={EntityProfileCreateDocumentStore} />
                <div className="entity-profile-list-profiles">
                    {content}
                </div>
            </div>
        );
    }
}

export { EntityProfileList as default, EntityProfileList }