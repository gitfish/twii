import { IGrid } from "./IGrid";
import { observable, computed, action } from "mobx";
import * as ComponentTypes from "./ComponentTypes";
import { IWindow } from "./IWindow";
import { Window } from "./Window";
import { IRequest } from "@twii/router/lib/IRequest";
import { Component } from "./Component";
import { isFunction } from "@twii/common/lib/LangUtils";
import { ISupplierFunc } from "@twii/common/lib/ISupplierFunc";
import { IComponent } from "./IComponent";
import { WindowManager } from "./WindowManager";

class Grid extends WindowManager implements IGrid {
    @observable private _rows : number = 32;
    @observable private _columns : number = 32;
    @observable private _width : number = 0;
    @observable private _height : number = 0;

    constructor() {
        super();
        this.addEventListener("resize", this._onResize);
    }

    private _onResize = () => {
        this.windows.forEach(w => w.emit({ type: "resize" }));
    }

    get type() {
        return ComponentTypes.grid;
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
        if(!isNaN(rows) && rows > 0) {
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
        if(!isNaN(columns) && columns > 0) {
            this._columns = columns;
        }
    }

    @computed
    get width() {
        return this._width;
    }
    set width(value) {
        this.setWidth(value);
    }
    @action
    setWidth(width : number) {
        this._width = width;
    }

    @computed
    get height() {
        return this._height;
    }
    set height(value) {
        this.setHeight(value);
    }
    @action
    setHeight(height : number) {
        this._height = height;
    }

    @action
    setDimensions(width : number, height : number) {
        this.setWidth(width);
        this.setHeight(height);
    }

    @action
    layout(width : number, height : number) {
        this.setDimensions(width, height);
        if(this.windowCount > 0) {
            const windowWidth = Math.floor(this.columns / 2);
            const windowHeight = Math.floor(this.rows / 1.3);
            // go through each of the windows and allocated grid coords and size
            let x = 0;
            let y = 0;
            this.windows.forEach(w => {
                let args = w.layout ? w.layout.grid : undefined;
                if(!args) {
                    args = {
                        x: x,
                        y: y,
                        width: windowWidth,
                        height: windowHeight
                    };
                    w.setLayout({ grid: args });
                }
                x += args.width;
                if(x >= this.columns) {
                    x = 0;
                    y += windowHeight;
                }
            });
        }
    }

    @computed
    get cellWidth() {
        return Math.floor(this.width / this.columns);
    }

    @computed
    get cellHeight() {
        return Math.floor(this.height / this.rows);
    }

    @computed
    get config() {
        return {
            type: this.type,
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
            this.setRows(config ? config.rows : undefined);
            this.setColumns(config ? config.columns : undefined);
            this.setCloseDisabled(config ? config.closeDisabled : undefined);
        }));
    }
}

export { Grid }