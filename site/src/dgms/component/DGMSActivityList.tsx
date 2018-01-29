import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import SyncContainer from "common/component/SyncContainer";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IDGMSActivity from "../IDGMSActivity";
import IActivityFilterModel from "common/IActivityFilterModel";
import DGMSActivityDetailsList from "./DGMSActivityDetailsList";
import DGMSActivityColumns from "./DGMSActivityColumns";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import { createCopyToClipboardItem } from "entity/component/MasterEntitySourceHelper";
import DGMSActivityViewPrefsStore from "../DGMSActivityViewPrefsStore";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";

interface IDGMSActivityListProps {
    list: IMasterEntitySourceListModel<IDGMSActivity>;
}

@observer
class DGMSActivityListCommandBar extends React.Component<IDGMSActivityListProps, any> {
    render() {
        const items : IContextualMenuItem[] = [
            createActivityListFilterItem({ list: this.props.list, itemsTitle: "DGMS Activities" })
        ];
        const farItems : IContextualMenuItem[] = [
            createCopyToClipboardItem({ sourceList: this.props.list, itemType: "activity" }),
            createViewPreferencesMenuItem(DGMSActivityViewPrefsStore, DGMSActivityColumns)
        ];
        return <CommandBar className="entity-source-list-command-bar dgms-activity-list-command-bar" items={items} farItems={farItems} />;
    }
}

class DGMSActivityListContainer extends React.Component<IDGMSActivityListProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="entity-source-list-container dgms-activity-list-container">
                <DGMSActivityListCommandBar {...this.props} />
                <div className="entity-source-list-view dgms-activity-list-view">
                    <DGMSActivityDetailsList {...this.props} viewPreferences={DGMSActivityViewPrefsStore} />
                </div>
            </div>
        )
    }
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} />
    }
}

export { DGMSActivityListContainer as default, DGMSActivityListContainer, IDGMSActivityListProps }