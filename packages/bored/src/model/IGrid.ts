import { IWindowManager } from "./IWindowManager";

interface IGrid extends IWindowManager {
    rows: number;
    columns: number;
    cellSize: number;
    cellMargin: number;
    setCellSize(cellSize : number) : void;
    setCellMargin(cellMargin : number) : void;
    setRows(rows : number) : void;
    setColumns(columns : number) : void;
}

export { IGrid }