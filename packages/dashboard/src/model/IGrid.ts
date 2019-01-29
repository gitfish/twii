import { IWindowManager } from "./IWindowManager";
import { IWindow, IWindowConfig } from "./IWindow";
import { IGridBounds } from "./IGridBounds";

interface IGridConfig {
    type?: string;
    cellSize?: number;
    cellMargin?: number;
    defaultWindowColSpan?: number;
    defaultWindowRowSpan?: number;
    windows?: IWindowConfig[];
    closeDisabled?: boolean;
    maximizedIndex?: number;
    activeIndex?: number;
}

interface IGrid extends IWindowManager {
    rows: number;
    viewportRows: number;
    columns: number;
    viewportColumns: number;
    cellSize: number;
    cellMargin: number;
    gridWidth : number;
    gridHeight : number;
    defaultWindowColSpan : number;
    defaultWindowRowSpan : number;
    settingsActive : boolean;
    setCellSize(cellSize : number) : void;
    setCellMargin(cellMargin : number) : void;
    setDefaultWindowColSpan(defaultWindowColSpan : number) : void;
    setDefaultWindowRowSpan(defaultWindowRowSpan : number) : void;
    moveTo(colIndex : number, rowIndex : number, window?: IWindow) : void;
    resizeTo(colIndex : number, rowIndex : number, window?: IWindow) : void;
    getCollisions(pos : IGridBounds) : IWindow[];
    getBounds(window : IWindow) : IGridBounds;
    setBounds(window : IWindow, pos : IGridBounds) : void;
    setSettingsActive(settingsActive : boolean) : void;
    config: IGridConfig;
    setConfig(config : IGridConfig) : void;
}

export { IGrid, IGridConfig }