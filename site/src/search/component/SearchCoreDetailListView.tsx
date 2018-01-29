import * as React from "react";
import { observer } from "mobx-react";
import {
    DetailsList,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    IColumn,
    Selection,
    DetailsRow,
    IDetailsRowProps
} from "office-ui-fabric-react/lib/DetailsList";
import { applySort } from "common/component/ColumnSortHelper";
import ISearchCoreModel from "../ISearchCoreModel";

interface ISearchCoreDetailListViewProps {
    core: ISearchCoreModel;
    columns: IColumn[];
}

@observer
class SearchCoreDetailListView extends React.Component<ISearchCoreDetailListViewProps, any> {
    private _handleColumnHeaderClick = (e : React.MouseEvent<HTMLElement>, column: IColumn) => {
        this.props.core.setSortBy(column.fieldName);
    }
    render() {
        const columns = applySort(this.props.columns, this.props.core.sortBy ?
            { field: this.props.core.sortBy, descending: this.props.core.sortDescending } : undefined);
        return (
                <DetailsList columns={columns}
                             items={this.props.core.items}
                             onColumnHeaderClick={this._handleColumnHeaderClick}
                             layoutMode={DetailsListLayoutMode.fixedColumns}
                             constrainMode={ConstrainMode.unconstrained}
                             checkboxVisibility={CheckboxVisibility.hidden} />
        );
    }
}

export { SearchCoreDetailListView as default, SearchCoreDetailListView, ISearchCoreDetailListViewProps }