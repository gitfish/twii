import * as React from "react";
import { observer } from "mobx-react";
import {
    DetailsList, 
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    IColumn,
    ColumnActionsMode,
    DetailsRow,
    IDetailsRowProps,
    Selection,
    SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { ISmartGateSearchResultListModel } from "../ISmartGateSearchResultListModel";
import { ISmartGateSearchResult } from "../ISmartGateSearchResult";
import * as SortUtils from "util/Sort";
import * as SearchUtils from "util/Search";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";
import { All } from "./SmartGateSearchResultColumns";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

interface ISmartGateSearchResultDetailsListProps {
    searchResult: ISmartGateSearchResultListModel;
    onItemInvoked?: (item : ISmartGateSearchResult) => void;
}

@observer
class SmartGateSearchResultDetailsList extends React.Component<ISmartGateSearchResultDetailsListProps, any> {
    private _onColumnHeaderClick = (e : React.MouseEvent<HTMLElement>, column: IColumn) => {
        this.props.searchResult.sort.toggleSort(column.fieldName);
    }
    private _onShouldVirtualize = () => {
        return this.props.searchResult.itemsView.length > 200;
    }
    render() {
        const itemsView = this.props.searchResult.itemsView;
        if(!itemsView || itemsView.length === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>There are no search results matching the specified filter</MessageBar>;
        }
        const columns = ColumnSortHelper.applySort(All, this.props.searchResult.sort);

        return (
            <DetailsList className="master-entity-search-result-details-list"
                            columns={columns}
                            items={itemsView}
                            selectionMode={SelectionMode.single}
                            onItemInvoked={this.props.onItemInvoked}
                            onColumnHeaderClick={this._onColumnHeaderClick}
                            layoutMode={DetailsListLayoutMode.fixedColumns}
                            constrainMode={ConstrainMode.unconstrained}
                            checkboxVisibility={CheckboxVisibility.hidden}
                            onShouldVirtualize={this._onShouldVirtualize}
                            skipViewportMeasures={true} />
        );            
    }
}

export {
    ISmartGateSearchResultDetailsListProps,
    SmartGateSearchResultDetailsList
};