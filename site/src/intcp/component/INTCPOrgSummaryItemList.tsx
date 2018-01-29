import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import INTCPOrgSummaryItemDetailsList from "./INTCPOrgSummaryItemDetailsList";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IINTCPOrgSummaryItem from "../IINTCPOrgSummaryItem";
import SyncContainer from "common/component/SyncContainer";
import { createCopyToClipboardItem } from "entity/component/MasterEntitySourceHelper";

interface IINTCPOrgSummaryItemListProps {
    list: IMasterEntitySourceListModel<IINTCPOrgSummaryItem>;
}

@observer
class INTCPOrgSummaryItemListCommandBar extends React.Component<IINTCPOrgSummaryItemListProps, any> {
    render() {
        const items : IContextualMenuItem[] = [];
        const farItems : IContextualMenuItem[] = [
            createCopyToClipboardItem({ sourceList: this.props.list, itemType: "movement" })
        ];
        return <CommandBar className="entity-source-list-command-bar intcp-movement-list-command-bar" items={items} farItems={farItems} />;
    }
}

class INTCPOrgSummaryItemListContainer extends React.Component<IINTCPOrgSummaryItemListProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="entity-source-list-container intcp-org-summary-item-list-container">
                <INTCPOrgSummaryItemListCommandBar {...this.props} />
                <div className="entity-source-list-view intcp-org-summary-item-list-view">
                    <INTCPOrgSummaryItemDetailsList {...this.props} />
                </div>
            </div>
        )
    }
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} syncLabel="Loading INTCP Org Summary" />;
    }
}

export { INTCPOrgSummaryItemListContainer as default, INTCPOrgSummaryItemListContainer }