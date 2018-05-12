import { IWindowManager } from "./IWindowManager";

interface IGrid extends IWindowManager {
    columns: number;
    width : number;
    height : number;
    cellWidth : number;
    defaultCellHeight: number;

    setColumns(columns : number) : void;
    setWidth(width : number) : void;
    setHeight(width : number) : void;
    setDefaultCellHeight(defaultCellHeight : number) : void;
    setDimensions(width : number, height : number) : void;
    layout(width : number, height : number) : void;
}

export { IGrid }