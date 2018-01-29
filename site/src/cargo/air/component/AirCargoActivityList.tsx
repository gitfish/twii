import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import AirCargoActivityDetailsList from "./AirCargoActivityDetailsList";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IAirCargoActivity from "../IAirCargoActivity";
import AirCargoActivityColumns from "./AirCargoActivityColumns";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import SyncContainer from "common/component/SyncContainer";
import AirCargoActivityDetailPanel from "./AirCargoActivityDetail";
import AirCargoActivityDetailStore from "../AirCargoActivityDetailStore";
import { createCopyToClipboardItem } from "entity/component/MasterEntitySourceHelper";
import AirCargoActivityViewPrefsStore from "../AirCargoActivityViewPrefsStore";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";

interface IAirCargoActivityListProps {
    list: IMasterEntitySourceListModel<IAirCargoActivity>;
}

@observer
class AirCargoActivityListCommandBar extends React.Component<IAirCargoActivityListProps, any> {
    render() {
        const items : IContextualMenuItem[] = [
            createActivityListFilterItem({ list: this.props.list, itemsTitle: "Air Cargo Activities"})
        ];
        const farItems : IContextualMenuItem[] = [
            createCopyToClipboardItem({ sourceList: this.props.list, itemType: "activity/air" }),
            createViewPreferencesMenuItem(AirCargoActivityViewPrefsStore, AirCargoActivityColumns)
        ];
        return <CommandBar className="entity-source-list-command-bar air-cargo-activity-list-command-bar" items={items} farItems={farItems} />;
    }
}

@observer
class AirCargoActivityListContainer extends React.Component<IAirCargoActivityListProps, any> {
    private _onRenderDone = () => {
        let detailPanel = AirCargoActivityDetailStore.visible ? <AirCargoActivityDetailPanel model={AirCargoActivityDetailStore} /> : undefined;
        return (
            <div className="air-cargo-activity-list-container">
                <AirCargoActivityListCommandBar {...this.props} />
                {detailPanel}
                <div className="entity-source-list-view air-cargo-activity-list-view" style={{ overflow: "auto" }}>
                    <AirCargoActivityDetailsList {...this.props} viewPreferences={AirCargoActivityViewPrefsStore} />
                </div>
            </div>
        );
    }
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Air Cargo Activities..." />;
    }
}

export {
    AirCargoActivityListContainer as default,
    AirCargoActivityListContainer,
    IAirCargoActivityListProps
}