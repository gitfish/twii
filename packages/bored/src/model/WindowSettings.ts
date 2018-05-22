import { observable, computed, action } from "mobx";
import { IWindowSettings } from "./IWindowSettings";
import { IWindow } from "./IWindow";

class WindowSettings implements IWindowSettings {
    @observable protected _window : IWindow;
    @observable protected _borderWidth : number;
    @observable protected _headerHeight : number;
    @observable protected _data : any = {};

    constructor(window?: IWindow) {
        this._window = window;
    }

    @computed
    get data() {
        return Object.assign({}, this._data);
    }
    set data(value) {
        this.setData(value);
    }
    @action
    setData(data : any) {
        this._data = Object.assign({}, this._data, data);
    }

    @computed
    get borderWidth() {
        let borderWidth = this._borderWidth;
        if(borderWidth === undefined) {
            const mgr = this._window ? this._window.manager : undefined;
            if(mgr) {
                borderWidth = mgr.windowSettings.borderWidth;
            }
        }
        return borderWidth !== undefined ? borderWidth : 0;
    }
    set borderWidth(value) {
        this.setBorderWidth(value);
    }
    @action
    setBorderWidth(borderWidth : number) {
        if(borderWidth >= 0) {
            this._borderWidth = borderWidth;
        }
    }

    @computed
    get headerHeight() {
        let headerHeight = this._headerHeight;
        if(headerHeight === undefined) {
            const mgr = this._window ? this._window.manager : undefined;
            if(mgr) {
                headerHeight = mgr.windowSettings.headerHeight;
            }
        }
        return headerHeight !== undefined ? headerHeight : 0;
    }
    set headerHeight(value) {
        this.setHeaderHeight(value);
    }
    @action
    setHeaderHeight(headerHeight : number) {
        if(headerHeight >= 0) {
            this._headerHeight = headerHeight;
        }
    }

    @computed
    get config() {
        return {
            borderWidth: this._borderWidth,
            headerHeight: this._headerHeight,
            data: this.data
        };
    }
    set config(value) {
        this.setConfig(value);
    }

    @action
    setConfig(config : any) : void {
        this.setBorderWidth(config ? config.borderWidth : undefined);
        this.setHeaderHeight(config ? config.headerHeight : undefined);
        this.setData(config ? config.data : undefined);
    }

    toJSON() {
        return this.config;
    }
}

export { WindowSettings }
