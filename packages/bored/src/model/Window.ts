import { observable, action, computed, autorun, IReactionDisposer } from "mobx";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";
import { IWindowManager } from "./IWindowManager";
import { IRequest } from "@twii/router/lib/IRequest";
import { Component } from "./Component";
import * as ComponentTypes from "./ComponentTypes";
import * as qs from "qs";
import { WindowAppHost } from "./WindowAppHost";
import { IConsumerFunc } from "@twii/core/lib/IConsumerFunc";
import { IStack } from "./IStack";
import { IPortal } from "./IPortal";
import { IPortalManager } from "./IPortalManager";

class Window extends Component implements IWindow {
    name : string;
    onClose : IConsumerFunc<IWindow>;
    @observable private _path : string;
    @observable private _params : any;
    @observable private _query : any;
    @observable private _appHost : WindowAppHost;
    @observable private _contentHidden : boolean = false;
    @observable private _closeDisabled = false;
    @observable private _transient : boolean = false;
    @observable private _layout : any;
    private _setViewportDisposer : IReactionDisposer;

    constructor() {
        super();
        this._appHost = new WindowAppHost(this);
        this._setViewportDisposer = autorun(this._setPortalViewport);
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
    get layout() {
        return Object.assign({}, this._layout);
    }
    set layout(value) {
        this.setLayout(value);
    }
    @action
    setLayout(layout : any) {
        this._layout = layout;
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
        this._contentHidden = contentHidden;
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
    get transient() {
        return this._transient;
    }
    set transient(value) {
        this.setTransient(value);
    }

    @action
    setTransient(transient : boolean) {
        this._transient = transient;
    }

    @computed
    get manager() : IWindowManager {
        const parent = this.parent;
        return parent && (parent.type === ComponentTypes.stack || parent.type === ComponentTypes.grid) ? parent as IWindowManager : undefined;
    }

    get type() {
        return ComponentTypes.window;
    }

    @computed
    get active() {
        const manager = this.manager;
        if(manager && manager.type === ComponentTypes.stack) {
            return (manager as IStack).active === this;
        }
        return false;
    }

    @action
    activate() {
        const manager = this.manager;
        if(manager && manager.type === ComponentTypes.stack) {
            (manager as IStack).setActive(this);
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
            contentHidden: this._contentHidden,
            layout: this._layout
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
        this.setLayout(config ? config.layout : undefined);
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

    @computed
    get portalManager() : IPortalManager {
        return this.dashboard ? this.dashboard.portalManager : undefined;
    }

    @action
    close() {
        this._appHost.emit({ type: "beforeunload" });
        this._appHost.emit({ type: "beforeclose" });
        if(this.onClose) {
            this.onClose(this);
        }
        const portalManager = this.portalManager;
        if(portalManager) {
            portalManager.destroyPortal(this);
        }
        this.removeFromParent();
        this._appHost.emit({ type: "unload" });
        this._appHost.emit({ type: "close" });
    }

    private _setPortalViewport = () => {
        const portalManager = this.portalManager;
        if(portalManager) {
            const { x, y, width, height } = this;
            portalManager.getPortal(this).setViewport(x, y, width, height);
        }
    }
}

export { Window }