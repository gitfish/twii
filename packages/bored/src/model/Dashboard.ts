import { observable, action, computed, reaction, IReactionDisposer } from "mobx";
import { IDashboard } from "./IDashboard";
import { IDashboardList } from "./IDashboardList";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";
import { Component } from "./Component";
import { Sync } from "@twii/core/lib/model/Sync";
import { ComponentFactory } from "./ComponentFactory";
import * as ComponentTypes from "./ComponentTypes";
import { IStack } from "./IStack";
import { ISplit, IHSplit, IVSplit } from "./ISplit";
import { IDashboardLayout } from "./IDashboardLayout";

class Dashboard extends Component implements IDashboard {
    @observable sync = new Sync();
    @observable private _title : string;
    @observable private _closeDisabled: boolean;
    
    private _saveDelay: number = 1000;
    loader : () => Promise<any> | any;
    saver : (data : any) => Promise<any> | any;
    private _configSaveDisposer : IReactionDisposer;
    
    @observable private _component : IComponent;
    @observable.ref private _drag : IComponent;
    @observable.ref private _blockSource : IComponent;

    private _portalRoot : HTMLElement;

    constructor() {
        super();
        this.addEventListener("resize", this._onResize);
    }

    private _onResize = () => {
        if(this._component) {
            this._component.emit({ type: "resize" });
        }
    }

    get type() {
        return ComponentTypes.dashboard;
    }

    @computed
    get dashboardList() : IDashboardList {
        return this.parent as IDashboardList;
    }

    @computed
    get closeDisabled() {
        return this._closeDisabled !== undefined ? this._closeDisabled : (this.dashboardList && this.dashboardList.closeDisabled);
    }
    set closeDisabled(value) {
        this.setCloseDisabled(value);
    }    
    @action
    setCloseDisabled(closeDisabled : boolean) {
        this._closeDisabled = closeDisabled;
    }

    @computed
    get component() {
        return this._component;
    }

    @action
    setComponent(component : IComponent) {
        if(component !== this._component) {
            if(component && component.parent !== this) {
                component.removeFromParent();
            }
            this._component = component;
            if(this._component) {
                this._component.parent = this;
            }
        }
    }

    @computed
    get windows() : IWindow[] {
        return this.findAll(c => c.type === ComponentTypes.window) as IWindow[];
    }

    @computed
    get drag() {
        return this._drag;
    }
    set drag(value) {
        this.setDrag(value);
    }
    @action
    setDrag(drag : IComponent) {
        this._drag = drag;
    }
    @action
    clearDrag() : void {
        this._drag = undefined;
    }

    @computed
    get blockSource() {
        return this._blockSource;
    }
    set blockSource(value) {
        this.setBlockSource(value);
    }

    @action
    setBlockSource(blockSource : IComponent) {
        this._blockSource = blockSource;
    }
    @action
    clearBlockSource() {
        this._blockSource = undefined;
    }

    @computed
    get title() {
        return this._title;
    }
    set title(value) {
        this.setTitle(value);
    }

    @action
    setTitle(title : string) {
        this._title = title;
    }

    @computed
    get dashboard() {
        return this;
    }

    @computed
    get componentConfig() {
        return this._component ? this._component.config : undefined;
    }

    set componentConfig(config : any) {
        this.setComponentConfig(config);
    }

    @action
    setComponentConfig(config : any) {
        if(config) {
            return ComponentFactory(config.type).then(component => {
                this.setComponent(component);
                return component.setConfig(config);
            });
        }
        this.setComponent(undefined);
        return Promise.resolve();
    }

    @computed
    get config() {
        return {
            type: this.type,
            title: this.title,
            closeDisabled: this._closeDisabled,
            component: this.componentConfig
        };
    }

    @action
    setConfig(value) {
        this.setTitle(value ? value.title : undefined);
        this.setCloseDisabled(value ? value.closeDisabled : undefined);
        return this.setComponentConfig(value ? value.component : undefined).then(() => {
            this.sync.syncEnd();
        });
    }

    @action
    remove(comp : IComponent) {
        if(comp && this._component && comp === this._component) {
            this.setComponent(undefined);
            this.removeFromParent();
        }
    }

    @action
    replace(newComp : IComponent, oldComp : IComponent) : void {
        if(oldComp === this._component) {
            this.setComponent(newComp);
        }
    }

    private _saveConfig = (config) => {
        this.saver(config);
    }

    get saveDelay() {
        return this._saveDelay;
    }
    set saveDelay(value : number) {
        if(!isNaN(value) && value >= 0) {
            this._saveDelay = value;
        }
    }

    @action
    private _loadDone = (config) => {
        return this.setConfig(config).then(() => {
            if(this.saver) {
                this._configSaveDisposer = reaction(() => {
                    return this.config;
                }, this._saveConfig, { delay: this.saveDelay });
            }
        });
    }

    @action
    private _loadError = (error : any) => {
        console.error(error);
        return this.setConfig(undefined).then(() => {
            this.sync.syncError(error);
        });
    }

    @action
    load() : Promise<any> {
        if(this._configSaveDisposer) {
            this._configSaveDisposer();
            delete this._configSaveDisposer;
        }
        if(this.loader) {
            this.sync.syncStart();
            return Promise.resolve(this.loader()).then(this._loadDone).catch(this._loadError);
        }
        return Promise.reject({ code: "ILLEGAL_STATE", message: "A loader has not been configured" });
    }

    @action
    clear() {
        this.setComponent(undefined);
    }

    @computed
    get isStackLayout() {
        return this.component && this.component.type === "stack";
    }

    @computed
    get isListLayout() {
        return this.component && this.component.type === "list";
    }

    @action
    splitLeft(newComp?: IComponent) : Promise<any> {
        if(this.component && this.component.type === ComponentTypes.stack) {
            return (this.component as IStack).splitLeft(newComp);
        }
        return Promise.resolve();
    }

    @action
    splitRight(newComp?: IComponent) : Promise<any> {
        if(this.component && this.component.type === ComponentTypes.stack) {
            return (this.component as IStack).splitRight(newComp);
        }
        return Promise.resolve();
    }

    @action
    splitTop(newComp : IComponent) : Promise<any> {
        if(this.component && this.component.type === ComponentTypes.stack) {
            return (this.component as IStack).splitTop(newComp);
        }
        return Promise.resolve();
    }
    
    @action
    splitBottom(newComp : IComponent) : Promise<any> {
        if(this.component && this.component.type === ComponentTypes.stack) {
            return (this.component as IStack).splitBottom(newComp);
        }
        return Promise.resolve();
    }

    protected _visitChildren(callback) {
        if(this._component) {
            this._component.visit(callback);
        }
    }

    protected _findFirstChild(predicate) {
        if(this._component) {
            return this._component.findFirst(predicate);
        }
    }

    protected _findAllChildren(predicate) : IComponent[] {
        if(this._component) {
            return this._component.findAll(predicate);
        }
    }

    @action
    close() {
        if(this._component) {
            this._component.close();
        }
        delete this._portalRoot;
    }

    get portalRoot() : HTMLElement {
        return this._portalRoot;
    }
    set portalRoot(portalRoot : HTMLElement) {
        this._portalRoot = portalRoot;
    }

    private _getPortalId(source : IComponent) : string {
        return `${source.id}-portal`;
    }

    getPortal(source : IComponent) : HTMLElement {
        if(this.portalRoot) {
            const portalId = this._getPortalId(source);
            let el = document.getElementById(portalId);
            if(!el) {
                el = document.createElement("div");
                el.id = portalId;
                const s = el.style;
                s.position = "fixed";
                s.zIndex = "1";
                this.portalRoot.appendChild(el);
            }
            return el;
        }
    }

    destroyPortal(source : IComponent) {
        const portalId = this._getPortalId(source);
        const el = document.getElementById(portalId);
        if(el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }
}

export { Dashboard }