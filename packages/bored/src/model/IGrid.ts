import { IWindowManager } from "./IWindowManager";

interface IGrid extends IWindowManager {
    rows: number;
    columns: number;
    cellWidth: number;
    cellHeight: number;
    setCellWidth(cellWidth : number) : void;
    setCellHeight(cellHeight : number) : void;
    setRows(rows : number) : void;
    setColumns(columns : number) : void;
}

export { IGrid }