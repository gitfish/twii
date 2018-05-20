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

class Grid extends WindowManager implements IGrid {
    @observable private _cellSize : number = 80;
    @observable private _cellMargin : number = 8;
    @observable private _rows : number = 30;
    @observable private _columns : number = 30;
    private _setViewportDisposer : IReactionDisposer;

    constructor() {
        super();
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

    private _setWindowViewports = () => {
        if(this.portalManager) {
            let nx = 0;
            let ny = 0;
            let maxY = 0;
            this.windows.forEach(w => {
                const layout = w.layout;
                let x;
                let y;
                let colspan;
                let rowspan;
                if(layout && layout.grid) {
                    x = layout.grid.x;
                    y = layout.grid.y;
                    rowspan = layout.grid.rowspan;
                    colspan = layout.grid.colspan;
                }
                if(!rowspan) {
                    rowspan = 3;
                }
                if(!colspan) {
                    colspan = 4;
                }
                if(!x) {
                    if(nx + colspan >= this.columns) {
                        nx = 0;
                        ny = maxY;
                    }
                    x = nx;
                    nx += colspan;
                }
                if(!y) {
                    y = ny;
                }
                if(rowspan > maxY) {
                    maxY = rowspan;
                }
                const vx = this.x + this.cellMargin + (x * (this.cellSize + this.cellMargin));
                const vy = this.y + this.cellMargin + (y * (this.cellSize + this.cellMargin));
                const width = colspan * this.cellSize + ((colspan - 1) * this.cellMargin);
                const height = rowspan * this.cellSize + ((rowspan - 1) * this.cellMargin);
                w.setViewport(vx, vy, width, height);
            });
        }
    }
}

export { Grid }