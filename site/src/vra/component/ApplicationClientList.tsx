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
import IApplicationClientListModel from "../IApplicationClientListModel";
import IClientRiskCheckKey from "../IClientRiskCheckKey";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import { getApplicationClientColumns } from "./ApplicationClientColumns";

interface IApplicationClientListProps {
    applicationClientList: IApplicationClientListModel;
    onClientSelected?: (clientRiskCheckKey: IClientRiskCheckKey) => void;
}

@observer
class ApplicationClientList extends React.Component<IApplicationClientListProps, any> {
    private _onColumnHeaderClick = (e : React.MouseEvent<HTMLElement>, column: IColumn) => {
        this.props.applicationClientList.sort.toggleSort(column.fieldName);
    };
    render() {
        if(this.props.applicationClientList.total === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>No clients found</MessageBar>;
        }
        let columns = getApplicationClientColumns(this.props.onClientSelected);
        columns = ColumnSortHelper.applySort(columns, this.props.applicationClientList.sort);
        return (
            <DetailsList items={this.props.applicationClientList.itemsView}
                         className={css("application-client-list")}
                         columns={columns}
                         layoutMode={DetailsListLayoutMode.fixedColumns}
                         constrainMode={ConstrainMode.unconstrained}
                         compact={true}
                         checkboxVisibility={CheckboxVisibility.hidden}
                         onColumnHeaderClick={this._onColumnHeaderClick} />
        )
    }
}

class ApplicationClientListContainer extends React.Component<IApplicationClientListProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="application-client-list-container">
                <div className="application-client-list-view">
                    <ApplicationClientList {...this.props} />
                </div>
            </div>
        )
    };
    render() {
        return (
            <Details title="List of Clients" controlOnHeaderClick={false} open={true}>
                <SyncContainer sync={this.props.applicationClientList.sync} onRenderDone={this._onRenderDone} />
            </Details>
        )
    }
}

export { ApplicationClientList as default, ApplicationClientList, ApplicationClientListContainer }