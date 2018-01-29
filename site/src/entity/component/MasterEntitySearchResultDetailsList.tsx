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
import IMasterEntitySearchResultModel from "../IMasterEntitySearchResultModel";
import IMasterEntitySearchResultItem from "../IMasterEntitySearchResultItem";
import * as SortUtils from "util/Sort";
import * as SearchUtils from "util/Search";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";
import MasterEntitySearchResultItemColumns from "./MasterEntitySearchResultItemColumns";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import MasterEntitySourceSummary from "./MasterEntitySourceSummary";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

interface IMasterEntitySearchResultDetailsListProps {
    searchResult: IMasterEntitySearchResultModel;
    onItemSelected?: (item : IMasterEntitySearchResultItem) => void;
}

@observer
class MasterEntitySearchResultDetailsList extends React.Component<IMasterEntitySearchResultDetailsListProps, any> {
    private _selection : Selection;
    constructor(props : IMasterEntitySearchResultDetailsListProps) {
        super(props);
        this._selection = new Selection({
            onSelectionChanged: this._onSelectionChange
        });
    }

    private _onSelectionChange = () => {
        if(this._selection.getSelectedCount() > 0 && this.props.onItemSelected) {
            const item = this._selection.getSelection()[0] as IMasterEntitySearchResultItem;
            this.props.onItemSelected(item);
        }
    }
    private _onItemInvoked = (item) => {
        this.props.onItemSelected(item);
    }
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
        const columns = ColumnSortHelper.applySort(MasterEntitySearchResultItemColumns, this.props.searchResult.sort);

        return (
            <DetailsList className="master-entity-search-result-details-list"
                            columns={columns}
                            items={itemsView}
                            selection={this._selection}
                            selectionMode={SelectionMode.single}
                            onItemInvoked={this._onItemInvoked}
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
    MasterEntitySearchResultDetailsList as default,
    MasterEntitySearchResultDetailsList,
    IMasterEntitySearchResultDetailsListProps
};