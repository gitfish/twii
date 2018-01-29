import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import SyncContainer from "common/component/SyncContainer";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import ISortModel from "common/ISortModel";
import IEXAMSActivity from "../IEXAMSActivity";
import EXAMSActivityColumns from "./EXAMSActivityColumns";
import EXAMSActivityDetailsList from "./EXAMSActivityDetailsList";
import IActivityFilterModel from "common/IActivityFilterModel";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import { createCopyToClipboardItem } from "entity/component/MasterEntitySourceHelper";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import EXAMSActivityViewPrefsStore from "../EXAMSActivityViewPrefsStore";

interface IEXAMSActivityListProps {
    list: IMasterEntitySourceListModel<IEXAMSActivity>;
}

@observer
class EXAMSActivityListCommandBar extends React.Component<IEXAMSActivityListProps, any> {
    render() {
        const items : IContextualMenuItem[] = [
            createActivityListFilterItem({ list: this.props.list, itemsTitle: "EXAM Activities" })
        ];
        const farItems : IContextualMenuItem[] = [
            createCopyToClipboardItem({ sourceList: this.props.list, itemType: "activity" }),
            createViewPreferencesMenuItem(EXAMSActivityViewPrefsStore, EXAMSActivityColumns)
        ];
        return <CommandBar className="exams-activity-list-command-bar" items={items} farItems={farItems} />;
    }
}

class EXAMSActivityListContainer extends React.Component<IEXAMSActivityListProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="entity-source-list-container exams-activity-list-container">
                <EXAMSActivityListCommandBar {...this.props} />
                <div className="entity-source-list-view exams-activity-list-view">
                    <EXAMSActivityDetailsList {...this.props} viewPreferences={EXAMSActivityViewPrefsStore} />
                </div>
            </div>
        );
    }
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} />;
    }
}

export { EXAMSActivityListContainer as default, EXAMSActivityListContainer, IEXAMSActivityListProps }