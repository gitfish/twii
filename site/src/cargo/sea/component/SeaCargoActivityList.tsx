import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import SeaCargoActivityDetailsList from "./SeaCargoActivityDetailsList";
import SeaCargoActivityDetailsPanel from "./SeaCargoActivityDetail";
import SeaCargoActivityDetailStore from "../SeaCargoActivityDetailStore";
import SeaCargoActivityColumns from "./SeaCargoActivityColumns";
import ISeaCargoActivity from "../ISeaCargoActivity";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import SyncContainer from "common/component/SyncContainer";
import { createCopyToClipboardItem } from "entity/component/MasterEntitySourceHelper";
import SeaCargoActivityViewPrefsStore from "../SeaCargoActivityViewPrefsStore";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";

interface ISeaCargoActivityListProps {
    list: IMasterEntitySourceListModel<ISeaCargoActivity>;
}

@observer
class SeaCargoActivityListCommandBar extends React.Component<ISeaCargoActivityListProps, any> {
    render() {
        const items : IContextualMenuItem[] = [
            createActivityListFilterItem({ list: this.props.list, itemsTitle: "Sea Cargo Activities" })
        ];
        const farItems : IContextualMenuItem[] = [
            createCopyToClipboardItem({ sourceList: this.props.list, itemType: "activity/sea" }),
            createViewPreferencesMenuItem(SeaCargoActivityViewPrefsStore, SeaCargoActivityColumns)
        ];
        return <CommandBar className="entity-source-list-command-bar sea-cargo-activity-list-command-bar" items={items} farItems={farItems} />;
    }
}

@observer
class SeaCargoActivityListContainer extends React.Component<ISeaCargoActivityListProps, any> {
    private _onRenderDone = () => {
        let detailPanel = SeaCargoActivityDetailStore.visible ? <SeaCargoActivityDetailsPanel model={SeaCargoActivityDetailStore} /> : undefined;
        return (
            <div className="sea-cargo-activity-list-container">
                <SeaCargoActivityListCommandBar {...this.props} />
                {detailPanel}
                <div className="entity-source-list-view sea-cargo-activity-list-view" style={{ overflow: "auto" }}>
                    <SeaCargoActivityDetailsList {...this.props} viewPreferences={SeaCargoActivityViewPrefsStore} />
                </div>
            </div>
        );
    }
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Sea Cargo Activities..." />;
    }
}

export {
    SeaCargoActivityListContainer as default,
    SeaCargoActivityListContainer,
    ISeaCargoActivityListProps
}