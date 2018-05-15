import { IWindowManager } from "./IWindowManager";

interface IGrid extends IWindowManager {
    columns: number;
    width : number;
    height : number;
    cellWidth : number;
    defaultCellHeight: number;

    setColumns(columns : number) : void;
    setDefaultCellHeight(defaultCellHeight : number) : void;
    //layout(width : number, height : number) : void;
}

export { IGrid }