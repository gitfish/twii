import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import EROLLEntityDetailsList from "./EROLLEntityDetailsList";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import SyncContainer from "common/component/SyncContainer";
import {IEROLLEntity} from "../IEROLLEntity";
import { createCopyToClipboardItem } from "entity/component/MasterEntitySourceHelper";

interface IEROLLEntityListProps {
    list: IMasterEntitySourceListModel<IEROLLEntity>;
}

@observer
class EROLLEntityListCommandBar extends React.Component<IEROLLEntityListProps, any> {
    render() {
        const items : IContextualMenuItem[] = [
            createActivityListFilterItem({ list: this.props.list, itemsTitle: "EROLL Instances", viewOptions: { fromFilterHidden: true, toFilterHidden: true } })
        ];
        const farItems : IContextualMenuItem[] = [
            createCopyToClipboardItem({ sourceList: this.props.list, itemType: "entity" }),
        ];
        return <CommandBar className="entity-source-list-command-bar entity-eroll-list-command-bar" items={items} farItems={farItems}/>;
    }
}

class EROLLEntityListContainer extends React.Component<IEROLLEntityListProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="entity-source-list-container entity-eroll-list-container">
                <EROLLEntityListCommandBar {...this.props} />
                <div className="entity-source-list-view entity-eroll-list-view">
                    <EROLLEntityDetailsList {...this.props} />
                </div>
            </div>
        );
    };
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} syncLabel="Loading EROLL Instances..." />;
    }
}

export {
    EROLLEntityListContainer as default,
    EROLLEntityListContainer
}