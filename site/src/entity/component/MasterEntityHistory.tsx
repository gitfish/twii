import * as React from "react";
import { observer } from "mobx-react";
import {
    DetailsList,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    SelectionMode,
    IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import IMasterEntityHistoryModel from "../IMasterEntityHistoryModel";
import IMasterEntityModel from "../IMasterEntityModel";
import IMasterEntityPotentialMatchesModel from "../IMasterEntityPotentialMatchesModel";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { MasterEntityHistoryColumns, StartTimestamp as HistoryStartTimestamp } from "./MasterEntityHistoryColumns";
import { MasterEntityPotentialMatchesColumns, StartTimestamp as PotentialMatchStartTimestamp } from "./MasterEntityPotentialMatchesColumns";
import SyncContainer from "common/component/SyncContainer";
import { Details } from "common/component/Details";
import { css } from "office-ui-fabric-react/lib/Utilities";
import "./MasterEntitySearchResult.scss";

interface IMasterEntityHistoryListProps {
    model: IMasterEntityHistoryModel;
}

@observer
class MasterEntityHistoryList extends React.Component<IMasterEntityHistoryListProps, any> {
    private _onColumnHeaderClick = (e : React.MouseEvent<HTMLElement>, column: IColumn) => {
        this.props.model.sort.toggleSort(column.fieldName);
    };
    componentWillMount() {
        this.props.model.sort.setSort(HistoryStartTimestamp.fieldName, false);
    }
    render() {
        const itemsView = this.props.model.itemsView;
        if(!itemsView || itemsView.length === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>There is no history for this master entity</MessageBar>;
        }
        const columns = ColumnSortHelper.applySort(MasterEntityHistoryColumns, this.props.model.sort);
        return (
            <div className="master-entity-history-list">
                <DetailsList className="master-entity-history-details-list"
                             columns={columns}
                             items={itemsView}
                             selectionMode={SelectionMode.single}
                             onColumnHeaderClick={this._onColumnHeaderClick}
                             layoutMode={DetailsListLayoutMode.fixedColumns}
                             constrainMode={ConstrainMode.unconstrained}
                             checkboxVisibility={CheckboxVisibility.hidden} />
            </div>
        );
    }
}

interface IMasterEntityPotentialMatchesListProps {
    model: IMasterEntityPotentialMatchesModel;
}

@observer
class MasterEntityPotentialMatchesList extends React.Component<IMasterEntityPotentialMatchesListProps, any> {
    private _onColumnHeaderClick = (e : React.MouseEvent<HTMLElement>, column: IColumn) => {
        this.props.model.sort.toggleSort(column.fieldName);
    };
    componentWillMount() {
        this.props.model.sort.setSort(PotentialMatchStartTimestamp.fieldName, false);
    }
    render() {
        const itemsView = this.props.model.itemsView;
        if(!itemsView || itemsView.length === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>There are no potential matches for this master entity</MessageBar>;
        }
        const columns = ColumnSortHelper.applySort(MasterEntityPotentialMatchesColumns, this.props.model.sort);
        return (
            <div className="master-entity-potential-matches-list">
                <DetailsList className="master-entity-potential-matches-details-list"
                             columns={columns}
                             items={itemsView}
                             selectionMode={SelectionMode.single}
                             onColumnHeaderClick={this._onColumnHeaderClick}
                             layoutMode={DetailsListLayoutMode.fixedColumns}
                             constrainMode={ConstrainMode.unconstrained}
                             checkboxVisibility={CheckboxVisibility.hidden} />
            </div>
        );
    }
}

interface IMasterEntityHistoryProps {
    masterEntity: IMasterEntityModel;
    history: IMasterEntityHistoryModel;
    potentialMatches: IMasterEntityPotentialMatchesModel;
}

@observer
class MasterEntityHistoryContainer extends React.Component<IMasterEntityHistoryProps, any> {
    private _onRenderHistoryDone = () => {
        return <MasterEntityHistoryList model={this.props.history} />;
    };
    private _onRenderPotentialMatchesDone = () => {
        return <MasterEntityPotentialMatchesList model={this.props.potentialMatches} />;
    };
    private _handlePotentialMatchesClick = () => {
        this.props.potentialMatches.load(this.props.masterEntity.masterEntityId);
        this.props.potentialMatches.setVisible(true);
    };
    render() {
        let potentialMatchesContent;
        if (this.props.potentialMatches.visible) {
            potentialMatchesContent =
            <Details className={css("details-panel")}
                     summary={<div>Potential Matches</div>}
                     open={true}
                     controlOnHeaderClick={true}
                     headerClassName={css("master-entity-potential-matches-header")}
                     bodyClassName="master-entity-potential-matches-body">
                <SyncContainer sync={this.props.potentialMatches.sync}
                               onRenderDone={this._onRenderPotentialMatchesDone}
                               syncLabel="Fetching Potential Matches..." />
            </Details>
        } else {
            potentialMatchesContent =
                <DefaultButton iconProps={ { iconName: 'Group' } } onClick={this._handlePotentialMatchesClick}>
                    Potential Matches
                </DefaultButton>
        }
        return (
            <div className="master-entity-history-container">
                <Details className={css("details-panel")}
                         summary={<div>History</div>}
                         open={true}
                         controlOnHeaderClick={true}
                         headerClassName={css("master-entity-history-header")}
                         bodyClassName="master-entity-history-body">
                    <SyncContainer sync={this.props.history.sync}
                                   onRenderDone={this._onRenderHistoryDone}
                                   syncLabel="Fetching History..." />
                </Details>
                {potentialMatchesContent}
            </div>
        );
    }
}

export { MasterEntityHistoryContainer as default, MasterEntityHistoryContainer };