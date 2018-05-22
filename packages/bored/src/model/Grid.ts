import { IGrid } from "./IGrid";
import { observable, computed, action, autorun, IReactionDisposer } from "mobx";
import * as ComponentTypes from "./ComponentTypes";
import { IWindow } from "./IWindow";
import { Window } from "./Window";
import { IRequest } from "@twii/router/lib/IRequest";
import { Component } from "./Component";
import { isFunction } from "@twii/core/lib/LangUtils";
import { ISupplierFunc } from "@twii/core/lib/ISupplierFunc";
import { IComponent } from "./IComponent";
import { WindowManager } from "./WindowManager";
import { IWindowGridData } from "./IWindowGridData";

class Grid extends WindowManager implements IGrid {
    @observable private _cellSize : number = 80;
    @observable private _cellMargin : number = 8;
    @observable private _rows : number = 30;
    @observable private _columns : number = 30;
    private _setViewportDisposer : IReactionDisposer;

    constructor() {
        super();
        this.windowSettings.borderWidth = 1;
        this.windowSettings.headerHeight = 28;
        this._setViewportDisposer = autorun(this._setWindowViewports);
    }

    get type() {
        return ComponentTypes.grid;
    }

    @computed
    get cellSize() {
        return this._cellSize;
    }
    set cellSize(value) {
        this.setCellSize(value);
    }
    @action
    setCellSize(cellSize : number) {
        if(cellSize > 0) {
            this._cellSize = cellSize;
        }
    }

    @computed
    get cellMargin() {
        return this._cellMargin;
    }
    set cellMargin(value) {
        this.setCellMargin(value);
    }
    @action
    setCellMargin(cellMargin : number) {
        if(cellMargin >= 0) {
            this._cellMargin = cellMargin;
        }
    }

    @computed
    get rows() {
        return this._rows;
    }
    set rows(value) {
        this.setRows(value);
    }
    @action
    setRows(rows : number) {
        if(rows > 0) {
            this._rows = rows;
        }
    }

    @computed
    get columns() {
        return this._columns;
    }
    set columns(value) {
        this.setColumns(value);
    }
    @action
    setColumns(columns : number) {
        if(columns > 0) {
            this._columns = columns;
        }
    }

    @computed
    get config() {
        return {
            type: this.type,
            cellSize: this.cellSize,
            cellMargin: this.cellMargin,
            rows: this.rows,
            columns: this.columns,
            windows: this.windows.filter(w => !w.transient).map(w => w.config),
            closeDisabled: this.closeDisabled
        };
    }

    @action
    setConfig(config : any) : Promise<any> {
        this.windows = [];
        let windowPromise;
        if(config && config.windows && config.windows.length > 0) {
            windowPromise = Promise.all(config.windows.map(wc => {
                const w = new Window();
                this.add(w);
                return w.setConfig(wc);
            }));
        } else {
            windowPromise = Promise.resolve();
        }
        return windowPromise.then(action(() => {
            this.setCellSize(config ? config.cellSize : undefined);
            this.setCellMargin(config ? config.cellMargin : undefined);
            this.setRows(config ? config.rows : undefined);
            this.setColumns(config ? config.columns : undefined);
            this.setCloseDisabled(config ? config.closeDisabled : undefined);
        }));
    }

    private _getGridData(w : IWindow) : IWindowGridData {
        let gridData =  w.settings.data.grid as IWindowGridData;
        if(!gridData) {
            // TODO: make this configurable
            gridData = { colSpan: 6, rowSpan: 4 };
        }
        return gridData;
    }

    private _setWindowViewports = () => {
        if(this.portalManager) {
            let nx = 0;
            let ny = 0;
            let maxY = 0;
            this.windows.forEach(w => {
                const data = this._getGridData(w);
                let x = data.colIndex;
                let y = data.rowIndex;
                let colSpan = data.colSpan;
                let rowSpan = data.rowSpan;
                if(!x) {
                    if(nx + colSpan >= this.columns) {
                        nx = 0;
                        ny = maxY;
                    }
                    x = nx;
                    nx += colSpan;
                }
                if(!y) {
                    y = ny;
                }
                if(rowSpan > maxY) {
                    maxY = rowSpan;
                }
                const vx = this.x + this.cellMargin + (x * (this.cellSize + this.cellMargin));
                const vy = this.y + this.cellMargin + (y * (this.cellSize + this.cellMargin));
                const width = colSpan * this.cellSize + ((colSpan - 1) * this.cellMargin);
                const height = rowSpan * this.cellSize + ((rowSpan - 1) * this.cellMargin);
                w.setViewport(vx, vy, width, height);
            });
        }
    }
}

export { Grid }