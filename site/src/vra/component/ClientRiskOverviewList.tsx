import * as React from "react";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import {
    IColumn,
    DetailsList,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility
} from "office-ui-fabric-react/lib/DetailsList";
import { css } from "@uifabric/utilities/lib/css";
import SyncContainer from "common/component/SyncContainer";
import Details from "common/component/Details";
import ISyncModel from "common/ISyncModel";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import IClientRiskOverviewListModel from "../IClientRiskOverviewListModel";

interface IClientRiskOverviewListProps {
    title: string;
    sync: ISyncModel;
    clientRiskOverviewList: IClientRiskOverviewListModel;
    columns: IColumn[];
}

@observer
class ClientRiskOverviewList extends React.Component<IClientRiskOverviewListProps, any> {
    private _onColumnHeaderClick = (e : React.MouseEvent<HTMLElement>, column: IColumn) => {
        this.props.clientRiskOverviewList.sort.toggleSort(column.fieldName);
    };
    render() {
        if(this.props.clientRiskOverviewList.total === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>No risk checks found</MessageBar>;
        }
        let columns = ColumnSortHelper.applySort(this.props.columns, this.props.clientRiskOverviewList.sort);
        return (
            <DetailsList items={this.props.clientRiskOverviewList.itemsView}
                         className={css("client-risk-overview-list")}
                         columns={columns}
                         layoutMode={DetailsListLayoutMode.fixedColumns}
                         constrainMode={ConstrainMode.unconstrained}
                         compact={true}
                         checkboxVisibility={CheckboxVisibility.hidden}
                         onColumnHeaderClick={this._onColumnHeaderClick}/>
        )
    }
}

class ClientRiskOverviewListContainer extends React.Component<IClientRiskOverviewListProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="client-risk-overview-list-container">
                <div className="client-risk-overview-list-view">
                    <ClientRiskOverviewList {...this.props} />
                </div>
            </div>
        )
    };
    render() {
        return (
            <Details title={this.props.title} controlOnHeaderClick={false} open={true}>
                <SyncContainer sync={this.props.sync} onRenderDone={this._onRenderDone} />
            </Details>
        )
    }
}

export { ClientRiskOverviewList as default, ClientRiskOverviewList, ClientRiskOverviewListContainer }