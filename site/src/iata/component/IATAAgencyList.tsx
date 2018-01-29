import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IATAAgencyDetailsList from "./IATAAgencyDetailsList";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import ISortModel from "common/ISortModel";
import IIATAAgency from "../IIATAAgency";
import IActivityFilterModel from "common/IActivityFilterModel";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import IATAAgencyColumns from "./IATAAgencyColumns";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import ViewPreferencesModel from "common/ViewPreferencesModel";
import SyncContainer from "common/component/SyncContainer";
import { openAgencyDetails } from "../IATAActions";
import IATAAgenciesViewPrefsStore from "../IATAAgenciesViewPrefsStore";
import { createCopyToClipboardItem } from "entity/component/MasterEntitySourceHelper";

interface IIATAAgencyListProps {
    list: IMasterEntitySourceListModel<IIATAAgency>;
}

@observer
class IATAAgencyListCommandBar extends React.Component<IIATAAgencyListProps, any> {
    private _onClickAgencyDetails = () => {
        if(this.props.list.selection.selectionCount === 1) {
            openAgencyDetails(this.props.list.selection.selectedItems[0]);
        }
    };
    render() {
        const items : IContextualMenuItem[] = [
            createActivityListFilterItem({ list: this.props.list, itemsTitle: "IATA Agencies", viewOptions: { fromFilterHidden: true, toFilterHidden: true } })
        ];
        const farItems : IContextualMenuItem[] = [
            {
                key: "agencyDetails",
                name: "Agency Details",
                iconProps: { iconName: "ZoomIn"},
                onClick: this._onClickAgencyDetails,
                disabled: this.props.list.selection.selectionCount !== 1
            },
            createCopyToClipboardItem({ sourceList: this.props.list, itemType: "agency" }),
            createViewPreferencesMenuItem(IATAAgenciesViewPrefsStore, IATAAgencyColumns)
        ];
        return <CommandBar className="entity-source-list-command-bar iata-agency-list-command-bar" items={items} farItems={farItems} />;
    }
}

class IATAAgencyListContainer extends React.Component<IIATAAgencyListProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="entity-source-list-container iata-agency-list-container">
                <IATAAgencyListCommandBar {...this.props} />
                <div className="entity-source-list-view iata-agency-list-view">
                    <IATAAgencyDetailsList {...this.props} viewPreferences={IATAAgenciesViewPrefsStore} />
                </div>
            </div>
        );
    }
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} syncLabel="Loading IATA Agencies..." />;
    }
}

export {
    IATAAgencyListContainer as default,
    IATAAgencyListContainer
}