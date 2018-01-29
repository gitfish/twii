import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import IATMovementDetailsList from "./IATMovementDetailsList";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IIATMovement from "../IIATMovement";
import IATMovementPassports from "./IATMovementPassports";
import IATMovementVisas from "./IATMovementVisas";
import IATMovementAliases from "./IATMovementAliases";
import IATMovementDetail from "./IATMovementDetail";
import IATFlightList from "./IATFlightList";
import IATAssociatedTravellerGraphDialog from "./IATAssociatedTravellerGraphDialog";
import "./IATMovementList.scss";
import IATMovementColumns from "./IATMovementColumns";
import IATMovementsViewPrefsStore from "../IATMovementsViewPrefsStore";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import IATMovementPassportsStore from "../IATMovementPassportsStore";
import IATMovementVisasStore from "../IATMovementVisasStore";
import SyncContainer from "common/component/SyncContainer";
import IATMovementDetailStore from "../IATMovementDetailStore";
import IATMovementAliasesStore from "../IATMovementAliasesStore";
import IATFlightListStore from "../IATFlightListStore";
import IMasterEntitySearchRequest from "entity/IMasterEntitySearchRequest"
import { openMovementDetails, openAliases, openFlightList } from "../IATActions";
import { createCopyToClipboardItem } from "entity/component/MasterEntitySourceHelper";

interface IIATMovementListProps {
    list: IMasterEntitySourceListModel<IIATMovement>;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

@observer
class IATMovementListCommandBar extends React.Component<IIATMovementListProps, any> {
    private _onClickMovementDetails = () => {
        openMovementDetails(this.props.list.selection.selectedItems[0]);
    };
    private _onClickAliases = () => {
        openAliases(this.props.list.source);
    };
    private _onClickFlightList = () => {
        openFlightList(this.props.list.source, this.props.list.selection.selectedItems);
    };
    render() {
        const items : IContextualMenuItem[] = [
            createActivityListFilterItem({ list: this.props.list, itemsTitle: "IAT Movements" })
        ];

        const farItems : IContextualMenuItem[] = [
            {
                key: "aliases",
                name: "Aliases",
                iconProps: { iconName: "PeopleAlert" },
                onClick: this._onClickAliases
            },
            {
                key: "movementDetails",
                name: "Movement Details",
                iconProps: { iconName: "ZoomIn" },
                onClick: this._onClickMovementDetails,
                disabled: this.props.list.selection.selectionCount !== 1
            },
            {
                key: "flightList",
                name: "Flight List",
                iconProps: { iconName: "Airplane"},
                onClick: this._onClickFlightList,
                disabled: this.props.list.selection.selectionCount === 0
            },
            createCopyToClipboardItem({ sourceList: this.props.list, itemType: "movement" }),
            createViewPreferencesMenuItem(IATMovementsViewPrefsStore, IATMovementColumns)
        ];
        
        return <CommandBar className="entity-source-list-command-bar iat-movement-list-command-bar" items={items} farItems={farItems} />;
    }
}

class IATMovementListContainer extends React.Component<IIATMovementListProps, any> {
    private _onRenderDone = () => {
        let passports = IATMovementPassportsStore.visible ? <IATMovementPassports model={IATMovementPassportsStore}/> : undefined;
        let visas = IATMovementVisasStore.visible ? <IATMovementVisas model={IATMovementVisasStore}/> : undefined;
        let aliases = IATMovementAliasesStore.visible ? <IATMovementAliases model={IATMovementAliasesStore}/> : undefined;
        let movementDetail = IATMovementDetailStore.visible ? <IATMovementDetail model={IATMovementDetailStore}/> : undefined;
        let flightList = IATFlightListStore.visible ? <IATFlightList model={IATFlightListStore}
                                                                     masterEntity={this.props.list.source.masterEntity}
                                                                     onSearch={this.props.onSearch}/> : undefined;
        let assocTravellers = IATFlightListStore.associatedTravellersGraphModel.visible ?
            <IATAssociatedTravellerGraphDialog model={IATFlightListStore} /> : undefined;
        return (
            <div className="entity-source-list-container iat-movement-list-container">
                <IATMovementListCommandBar {...this.props} />
                <div className="entity-source-list-view iat-movement-list-view">
                    {passports}
                    {visas}
                    {aliases}
                    {movementDetail}
                    {flightList}
                    {assocTravellers}
                    <IATMovementDetailsList {...this.props} viewPreferences={IATMovementsViewPrefsStore} />
                </div>
            </div>
        );
    }
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} syncLabel="Loading IAT Movements..." />
    }
}

export { IATMovementListContainer as default, IATMovementListContainer }