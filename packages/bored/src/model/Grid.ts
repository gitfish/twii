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
    @observable private _cellWidth : number = 80;
    @observable private _cellHeight : number = 80;
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
    get cellWidth() {
        return this._cellWidth;
    }
    set cellWidth(value) {
        this.setCellWidth(value);
    }
    @action
    setCellWidth(cellWidth : number) {
        if(cellWidth > 0) {
            this._cellWidth = cellWidth;
        }
    }

    @computed
    get cellHeight() {
        return this._cellHeight;
    }
    set cellHeight(value) {
        this.setCellHeight(value);
    }
    @action
    setCellHeight(cellHeight : number) {
        if(cellHeight > 0) {
            this._cellHeight = cellHeight;
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
            cellWidth: this.cellWidth,
            celllHeight: this.cellHeight,
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
            this.setCellWidth(config ? config.cellWidth : undefined);
            this.setCellHeight(config ? config.cellHeight : undefined);
            this.setRows(config ? config.rows : undefined);
            this.setColumns(config ? config.columns : undefined);
            this.setCloseDisabled(config ? config.closeDisabled : undefined);
        }));
    }

    private _setWindowViewports = () => {
        this.windows.forEach(w => {
            w.setViewport(this.x, this.y, 0, 0);
        });
    }
}

export { Grid }