import { IGrid } from "./IGrid";
import { observable, computed, action, autorun } from "mobx";
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
    @observable private _columns : number = 2;
    @observable private _width : number = 0;
    @observable private _height : number = 0;
    @observable private _defaultCellHeight : number = 320;

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
    relayout() {
        this.layout(this.width, this.height);
    }

    protected _windowsModified() {
        this.relayout();
    }

    @action
    layout(width : number, height : number) {
        this.setDimensions(width, height);
        if(this.windowCount > 0) {
            // go through each of the windows and allocated grid coords and size
            let col = 0;
            let offset = 0;
            let maxHeightForRow : number = 0;
            this.windows.forEach(w => {
                const args = {
                    col: col,
                    offset: offset,
                    height: this.defaultCellHeight
                };
                w.setLayout({ grid: args });
                col ++;
                if(args.height > maxHeightForRow) {
                    maxHeightForRow = args.height;
                }
                if(col >= this.columns) {
                    col = 0;
                    offset += maxHeightForRow;
                    maxHeightForRow = 0;
                }
            });
        }
    }

    @computed
    get cellWidth() {
        return Math.floor(this.width / this.columns);
    }

    @computed
    get defaultCellHeight() {
        return this._defaultCellHeight;
    }
    set defaultCellHeight(value) {
        this.setDefaultCellHeight(value);
    }
    
    @action
    setDefaultCellHeight(defaultCellHeight : number) {
        this._defaultCellHeight = defaultCellHeight;
    }

    @computed
    get config() {
        return {
            type: this.type,
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
            this.setColumns(config ? config.columns : undefined);
            this.setCloseDisabled(config ? config.closeDisabled : undefined);
        }));
    }
}

export { Grid }