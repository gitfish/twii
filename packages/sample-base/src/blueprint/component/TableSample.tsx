import * as React from "react";
import { Table } from "@blueprintjs/table/lib/esm/table";
import { Column } from "@blueprintjs/table/lib/esm/column";
import { ColumnHeaderCell } from "@blueprintjs/table/lib/esm/headers/columnHeaderCell";
import { Cell } from "@blueprintjs/table/lib/esm/cell/cell";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";

class TableSample extends React.Component<any, any> {
    private _renderColumnHeader = (columnIndex : number) => {
        return (
            <ColumnHeaderCell index={columnIndex} name={`Column ${columnIndex}`} />
        );
    }
    private _renderCell = (rowIndex : number, columnIndex : number) => {
        return (
            <Cell>Row: {rowIndex}, Column: {columnIndex}</Cell>
        );
    }
    render() {
        return (
            <div style={{ padding: 8 }}>
                <Table numRows={20}>
                    <Column columnHeaderCellRenderer={this._renderColumnHeader} cellRenderer={this._renderCell} />
                    <Column columnHeaderCellRenderer={this._renderColumnHeader} cellRenderer={this._renderCell} />
                    <Column columnHeaderCellRenderer={this._renderColumnHeader} cellRenderer={this._renderCell} />
                    <Column columnHeaderCellRenderer={this._renderColumnHeader} cellRenderer={this._renderCell} />
                    <Column columnHeaderCellRenderer={this._renderColumnHeader} cellRenderer={this._renderCell} />
                    <Column columnHeaderCellRenderer={this._renderColumnHeader} cellRenderer={this._renderCell} />
                </Table>
            </div>
        );
    }
}

class TableSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Table Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <TableSample />
            </SampleHostAppView>
        );
    }
}

export { TableSampleApp }

