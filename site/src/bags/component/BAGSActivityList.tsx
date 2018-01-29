import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import SyncContainer from "common/component/SyncContainer";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IBAGSActivity from "../IBAGSActivity";
import BAGSActivityDetailsList from "./BAGSActivityDetailsList";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import { createCopyToClipboardItem } from "entity/component/MasterEntitySourceHelper";
import BAGSActivityViewPrefsStore from "../BAGSActivityViewPrefsStore";
import BAGSActivityColumns from "./BAGSActivityColumns";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";

interface IBAGSActivityListProps {
    list: IMasterEntitySourceListModel<IBAGSActivity>;
}

@observer
class BAGSActivityListCommandBar extends React.Component<IBAGSActivityListProps, any> {
    render() {
        const items : IContextualMenuItem[] = [
            createActivityListFilterItem({ list: this.props.list, itemsTitle: "BAGS Activities" })
        ];
        const farItems : IContextualMenuItem[] = [
            createCopyToClipboardItem({ sourceList: this.props.list, itemType: "activity" }),
            createViewPreferencesMenuItem(BAGSActivityViewPrefsStore, BAGSActivityColumns)
        ];
        return <CommandBar className="entity-source-list-command-bar bags-activity-list-command-bar" items={items} farItems={farItems} />;
    }
}

class BAGSActivityListContainer extends React.Component<IBAGSActivityListProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="entity-source-list-container bags-activity-list-container">
                <BAGSActivityListCommandBar {...this.props} />
                <div className="entity-source-list-view bags-activity-list-view">
                    <BAGSActivityDetailsList {...this.props} viewPreferences={BAGSActivityViewPrefsStore} />
                </div>
            </div>
        );
    }
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} />;
    }
}

export { BAGSActivityListContainer as default, BAGSActivityListContainer, IBAGSActivityListProps }