import { observable, action, computed, autorun } from "mobx";
import SyncModel from "common/SyncModel";
import IComponent from "./IComponent";
import { IWindow, IWindowHeader } from "./IWindow";
import IWindowManager from "./IWindowManager";
import AppComponent from "./AppComponent";
import { isString, isNumber, isBoolean, isDate } from "util/Lang";
import IRequest from "roota/lib/IRequest";
import Component from "./Component";
import { dispatchWindowResize } from "./DOMHelper";
import * as ComponentTypes from "./ComponentTypes";
import * as qs from "qs";

interface IWindowSize {
    width: number;
    height: number;
}

const DefaultWindowSize : IWindowSize = {
    width: 0,
    height: 0
};

class Window extends AppComponent implements IWindow {
    name : string;
    unmountHandler : () => void;
    @observable private _contentHidden : boolean = false;
    @observable private _closeDisabled = false;
    private _lastSize : IWindowSize = DefaultWindowSize;

    constructor() {
        super();
        this.addEventListener("resize", this._onResizeInternal);
    }

    private _onResizeInternal = () => {
        // this is to ensure that the bound view gets first bite at the cherry
        this.emit({ type: "resizeview" });
    }

    get root() {
        return false;
    }

    @computed
    get closeDisabled() {
        return this._closeDisabled || (this.manager && this.manager.closeDisabled);
    }
    set closeDisabled(value) {
        this._closeDisabled = value;
    }

    @computed
    get contentHidden() {
        return this._contentHidden;
    }
    set contentHidden(value) {
        this.setContentHidden(value);
    }
    @action
    setContentHidden(contentHidden : boolean) {
        if(contentHidden !== this.contentHidden) {
            this._contentHidden = contentHidden;
            if(this.parent) {
                this.parent.emit({ type: "resize" });
            }
        }
    }
    @action
    toggleContent() {
        this.setContentHidden(!this.contentHidden);
    }

    @action
    setCloseDisabled(closeDisabled : boolean) : void {
        this._closeDisabled = closeDisabled;
    }

    @computed
    get manager() : IWindowManager {
        const parent = this.parent;
        return parent && (parent.type === ComponentTypes.stack || parent.type === ComponentTypes.list) ? parent as IWindowManager : undefined;
    }

    get type() {
        return ComponentTypes.window;
    }

    @computed
    get active() {
        const manager = this.manager;
        return manager ? manager.active === this : false;
    }

    @action
    activate() {
        const manager = this.manager;
        if(manager) {
            manager.setActive(this);
        }
    }

    @computed
    get config() {
        return {
            type: this.type,
            title: this.saveLocation ? this._title : undefined, // NOTE that we don't track even initial title when not saving location
            path: this.saveLocation ? this._path : this._initPath,
            params: this.saveLocation ? this._params : this._initParams,
            query: this.saveLocation ? this._query : this._initQuery,
            closeDisabled: this._closeDisabled,
            contentHidden: this._contentHidden
        };
    }

    @action
    setConfig(config) {
        this.setTitle(config ? config.title : undefined);
        this.setCloseDisabled(config ? config.closeDisabled : undefined);
        this.setPath(config ? config.path : undefined);
        this.setParams(config ? config.params : undefined);
        this.setQuery(config ? config.query : undefined);
        this.setContentHidden(config ? config.contentHidden : undefined);
        return Promise.resolve();
    }

    open(request : IRequest) {
        const manager = this.manager;
        if(manager) {
            return manager.open(request);
        }
        return undefined;
    }

    @action
    unmount() {
        if(this.unmountHandler) {
            this.unmountHandler();
        }
        this.dashboard.destroyPortal(this);
    }

    get portal() {
        return this.dashboard ? this.dashboard.getPortal(this) : undefined;
    }
}

export { Window as default, Window }