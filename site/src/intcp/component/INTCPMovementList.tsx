import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import INTCPMovementDetailsList from "./INTCPMovementDetailsList";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IINTCPMovement from "../IINTCPMovement";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import INTCPMovementColumns from "./INTCPMovementColumns";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import SyncContainer from "common/component/SyncContainer";
import INTCPMovementsViewPrefsStore from "../INTCPMovementsViewPrefsStore";
import { createCopyToClipboardItem } from "entity/component/MasterEntitySourceHelper";

interface IINTCPMovementListProps {
    list: IMasterEntitySourceListModel<IINTCPMovement>;
}

@observer
class INTCPMovementListCommandBar extends React.Component<IINTCPMovementListProps, any> {
    render() {
        const items : IContextualMenuItem[] = [
            createActivityListFilterItem({ list: this.props.list, itemsTitle: "INTCP Movements" })
        ];
        const farItems : IContextualMenuItem[] = [
            createCopyToClipboardItem({ sourceList: this.props.list, itemType: "movement" }),
            createViewPreferencesMenuItem(INTCPMovementsViewPrefsStore, INTCPMovementColumns)
        ];
        return <CommandBar className="entity-source-list-command-bar intcp-movement-list-command-bar" items={items} farItems={farItems} />;
    }
}

class INTCPMovementListContainer extends React.Component<IINTCPMovementListProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="entity-source-list-container intcp-movement-list-container">
                <INTCPMovementListCommandBar {...this.props} />
                <div className="entity-source-list-view intcp-movement-list-view">
                    <INTCPMovementDetailsList {...this.props} viewPreferences={INTCPMovementsViewPrefsStore} />
                </div>
            </div>
        );
    }
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} syncLabel="Loading INTCP Movements..." />;
    }
}

export {
    INTCPMovementListContainer as default,
    INTCPMovementListContainer
}