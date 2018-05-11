import { IWindowManager } from "./IWindowManager";

interface IGrid extends IWindowManager {
    rows: number;
    columns: number;
    width : number;
    height : number;
    cellWidth : number;
    cellHeight: number;

    setRows(rows : number) : void;
    setColumns(columns : number) : void;
    setWidth(width : number) : void;
    setHeight(width : number) : void;
    setDimensions(width : number, height : number) : void;
    layout(width : number, height : number) : void;
}

export { IGrid }