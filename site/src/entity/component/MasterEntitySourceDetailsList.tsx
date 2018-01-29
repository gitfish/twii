import * as React from "react";
import { observer } from "mobx-react";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import {
    IDetailsListProps,
    DetailsList,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    IColumn,
    ColumnActionsMode,
    Selection,
    SelectionMode,
    DetailsRow,
    IDetailsHeaderProps,
    IDetailsRowProps
} from "office-ui-fabric-react/lib/DetailsList";
import { getViewPreferenceColumns } from "common/component/ColumnHelper";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import { css } from "@uifabric/utilities/lib/css";
import DragStore from "common/DragStore";
import IViewPreferencesModel from "common/IViewPreferencesModel";
import IEntitySourceItems from "../IEntitySourceItems";
import "./MasterEntitySourceDetailsList.scss";

interface IMasterEntitySourceDetailsListProps {
    list: IMasterEntitySourceListModel<any>;
    itemType?: string;
    columns: IColumn[];
    viewPreferences?: IViewPreferencesModel;
    typeLabel?: string;
    onItemInvoked?: (item : any, index : number, e : Event) => void;
    layoutMode?: DetailsListLayoutMode;
    constrainMode?: ConstrainMode;
    skipViewportMeasures?: boolean;
    dragDropDisabled?: boolean;
    selectionDisabled?: boolean;
}

@observer
class MasterEntitySourceDetailsList extends React.Component<IMasterEntitySourceDetailsListProps, any> {
    private _onColumnHeaderClick = (e : React.MouseEvent<HTMLElement>, column: IColumn) => {
        this.props.list.sort.toggleSort(column.fieldName);
    }
    private _onItemDragStart = (e : React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const source = this.props.list.source;
        const itemType = this.props.itemType;
        const sourceItems : IEntitySourceItems = {
            source: this.props.list.source,
            type: this.props.itemType,
            items: this.props.list.selection.selectedItems
        }
        const r = {
            type: "entitySourceItems",
            value: sourceItems
        };
        const dataTransfer = JSON.stringify(r);
        e.dataTransfer.setData("text", dataTransfer);
        DragStore.setValue(r);
    }

    private _onRenderRow = (props : IDetailsRowProps) => {
        const row = <DetailsRow {...props} />;
        const selected = !this.props.selectionDisabled ? this.props.list.selection.selectedItems.indexOf(props.item) >= 0 : false;
        const draggable = selected && !this.props.dragDropDisabled;
        return <div draggable={draggable} onDragStart={draggable ? this._onItemDragStart : undefined} className={css("details-row-wrapper", { "is-selected": selected })}>{row}</div>;
    }

    private get _filteredColumns() {
        return getViewPreferenceColumns(this.props.columns, this.props.viewPreferences);
    }

    private _onShouldVirtualize = () => {
        return this.props.list.itemsView.length > 200;
    }

    render() {
        const itemsTitle = this.props.typeLabel || `${this.props.list.source.sourceSystemCode} items`;
        if(this.props.list.total === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>Unable to find any {itemsTitle}</MessageBar>;
        }

        const itemsView = this.props.list.itemsView;
        if(!itemsView || itemsView.length === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>Unable to find any matching {itemsTitle}</MessageBar>;
        }

        const selection = this.props.list.selection;
        const selectedItems = selection.selectedItems;
        let allSelected = itemsView.every(item => selectedItems.indexOf(item) >= 0);
        
        let columns = this._filteredColumns;
        columns = ColumnSortHelper.applySort(columns, this.props.list.sort);

        if(!this.props.selectionDisabled) {
            const selectColumn : IColumn = {
                key: "selected",
                fieldName: "selected",
                name: "Select",
                isIconOnly: true,
                ariaLabel: allSelected ? "All Items Selected" : selectedItems.length > 0 ? "Some Items Selected" : "No Items Selected",
                iconName: allSelected ? "CheckboxComposite" : "Checkbox",
                minWidth: 40,
                maxWidth: 40,
                isSorted: false,
                headerClassName: "selection-header",
                className: "selection-cell",
                onColumnClick: () => {
                    if(allSelected) {
                        selection.clearSelection();
                    } else {
                        selection.setSelectedItems(itemsView);
                    }
                },
                onRender: (item, index, column) => {
                    const selected = selection.selectedItems.indexOf(item) >= 0;
                    return <Checkbox checked={selected} onChange={() => {selection.toggleItem(item)}}/>;
                }
            };

            columns = [selectColumn].concat(columns);
        }

        return (
            <DetailsList items={itemsView.slice(0)}
                    className={css("master-entity-source-details-list")}
                    columns={columns}
                    onColumnHeaderClick={this._onColumnHeaderClick}
                    layoutMode={this.props.layoutMode !== undefined ? this.props.layoutMode : DetailsListLayoutMode.fixedColumns}
                    constrainMode={this.props.constrainMode !== undefined ? this.props.constrainMode : ConstrainMode.unconstrained}
                    onItemInvoked={this.props.onItemInvoked}
                    checkboxVisibility={CheckboxVisibility.hidden}
                    selectionMode={SelectionMode.none}
                    onShouldVirtualize={this._onShouldVirtualize}
                    onRenderRow={this._onRenderRow}
                    skipViewportMeasures={this.props.skipViewportMeasures !== undefined ? this.props.skipViewportMeasures : true} />
        );
    }
}

export { 
    MasterEntitySourceDetailsList as default,
    MasterEntitySourceDetailsList,
    IMasterEntitySourceDetailsListProps
}