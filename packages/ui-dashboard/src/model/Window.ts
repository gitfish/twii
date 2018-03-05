import { observable, action, computed, autorun } from "mobx";
import { SyncModel } from "@twii/core/lib/common/model/SyncModel";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";
import { IWindowManager } from "./IWindowManager";
import { IRequest } from "roota/lib/IRequest";
import { Component } from "./Component";
import * as ComponentTypes from "./ComponentTypes";
import * as qs from "qs";
import { WindowAppHost } from "./WindowAppHost";
import { IConsumerFunc } from "@twii/core/lib/common/IConsumerFunc";

class Window extends Component implements IWindow {
    name : string;
    onClose : IConsumerFunc<IWindow>;
    @observable private _path : string;
    @observable private _params : any;
    @observable private _query : any;
    @observable private _appHost : WindowAppHost;
    @observable private _contentHidden : boolean = false;
    @observable private _closeDisabled = false;

    constructor() {
        super();
        this._appHost = new WindowAppHost(this);
        this.addEventListener("resize", this._onResizeInternal);
    }

    private _onResizeInternal = () => {
        // this is to ensure that the bound view gets first bite at the cherry
        this.emit({ type: "resizeview" });
    }

    @computed
    get appHost() {
        return this._appHost;
    }

    @computed
    get path() {
        return this._path;
    }
    set path(value) {
        this.setPath(value);
    }

    @action
    setPath(path : string) {
        this._path = path;
    }

    @computed
    get params() {
        return Object.assign({}, this._params, this._query);
    }
    set params(value) {
        this.setParams(value);
    }
    @action
    setParams(params : any) {
        this._params = params;
    }

    @computed
    get query() {
        return Object.assign({}, this._query);
    }
    set query(value) {
        this.setQuery(value);
    }
    @action
    setQuery(query : any) {
        this._query = query;
    }

    @computed
    get title() {
        return this._appHost.title;
    }
    set title(value) {
        this.setTitle(value);
    }
    @action
    setTitle(title : string) {
        this._appHost.setTitle(title);
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
            path: this._path,
            params: this._params,
            query: this._query,
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
        return Promise.reject({ code: "INVALID_STATE", message: "No Window Manager Set" });
    }

    @action
    load(request : IRequest) {
        return this.appHost.load(request);
    }

    @action
    close() {
        this.emit({ type: "beforeclose" });
        if(this.onClose) {
            this.onClose(this);
        }
        if(this.dashboard) {
            this.dashboard.destroyPortal(this);
        }
        this.removeFromParent();
        this.emit({ type: "close" });
    }

    get portal() {
        return this.dashboard ? this.dashboard.getPortal(this) : undefined;
    }
}

export { Window }