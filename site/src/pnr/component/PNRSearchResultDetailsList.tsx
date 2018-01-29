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
import IPNRSearchResultsModel from "../IPNRSearchResultsModel";
import IPNRSearchResult from "../IPNRSearchResult";
import * as SortUtils from "util/Sort";
import * as SearchUtils from "util/Search";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";
import PNRSearchResultColumns from "./PNRSearchResultColumns";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { ClassNames } from "./PNRSearchResults.style";


interface IPNRSearchResultDetailsListProps {
    searchResult: IPNRSearchResultsModel;
    onItemSelected?: (item : IPNRSearchResult) => void;
}

@observer
class PNRSearchResultDetailsList extends React.Component<IPNRSearchResultDetailsListProps, any> {
    private _selection : Selection;

    constructor( props : IPNRSearchResultDetailsListProps) {
        super(props);
        this._selection = new Selection({
            onSelectionChanged: this._onSelectionChange
        });
    }

    private _onSelectionChange = () => {
        if(this._selection.getSelectedCount() > 0  && this.props.onItemSelected) {
            const item = this._selection.getSelection()[0] as IPNRSearchResult;
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
            return <MessageBar> messageBarType={MessageBarType.warning}>Unable to find any PNR Records</MessageBar>;
        }
        const columns = ColumnSortHelper.applySort(PNRSearchResultColumns, this.props.searchResult.sort);

        return (
            <DetailsList className="pnr-search-result-details-list"
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

export { PNRSearchResultDetailsList as default, PNRSearchResultDetailsList, IPNRSearchResultDetailsListProps }