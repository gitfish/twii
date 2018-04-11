import { observable, action, computed, reaction, IReactionDisposer } from "mobx";
import { IDashboardList } from "./IDashboardList";
import { IDashboard } from "./IDashboard";
import { IComponent } from "./IComponent";
import { Component } from "./Component";
import { Dashboard } from "./Dashboard";
import { Stack } from "./Stack";
import { Sync } from "@pu/common/lib/model/Sync";
import * as ComponentTypes from "./ComponentTypes";

class DashboardList extends Component implements IDashboardList {
    @observable sync = new Sync();
    @observable private _activeIndex : number = -1;
    @observable dashboards : IDashboard[] = [];
    @observable private _closeDisabled = false;
    @observable private _createDefaultDashboard : boolean = true;
    private _saveDelay: number = 1000;
    loader : () => Promise<any>;
    saver : (data : any) => Promise<any>;
    private _configSaveDisposer : IReactionDisposer;

    constructor() {
        super();
        this.addEventListener("resize", this._onResize);
    }

    private _onResize = () => {
        this.dashboards.forEach(db => db.emit({ type: "resize" }));
    }

    get type() {
        return ComponentTypes.dashboardList;
    }

    @computed
    get createDefaultDashboard() {
        return this._createDefaultDashboard;
    }
    set createDefaultDashboard(value) {
        this.setCreateDefaultDashboard(value);
    }
    
    @action
    setCreateDefaultDashboard(createDefaultDashboard : boolean) {
        this._createDefaultDashboard = createDefaultDashboard;
    }

    @computed
    get dashboardCount() {
        return this.dashboards ? this.dashboards.length : 0;
    }

    @computed
    get closeDisabled() {
        return this._closeDisabled;
    }
    set closeDisabled(value) {
        this.setCloseDisabled(value);
    }
    @action
    setCloseDisabled(closeDisabled : boolean) {
        this._closeDisabled = closeDisabled;
    }

    @computed
    get activeIndex() {
        return this._activeIndex || 0;
    }
    set activeIndex(value) {
        this.setActiveIndex(value);
    }

    @action
    setActiveIndex(value) {
        if(value !== this._activeIndex) {
            this._activeIndex = value;
        }
    }

    @computed
    get active() : IDashboard {
        return this.activeIndex >= 0 && this.activeIndex < this.dashboards.length ? this.dashboards[this.activeIndex] : undefined;
    }
    set active(value) {
        this.setActive(value);
    }

    @action
    setActive(value : IDashboard) {
        this.activeIndex = this.dashboards.indexOf(value);
    }

    @computed
    get config() {
        return {
            type: this.type,
            activeIndex: this.activeIndex,
            dashboards: this.dashboards.map(d => d.config),
            closeDisabled: this._closeDisabled
        };
    }

    @action
    setConfig(value) {
        this.dashboards = [];
        let dashboardPromise;
        if(value && value.dashboards && value.dashboards.length > 0) {
            dashboardPromise = Promise.all(value.dashboards.map(dc => {
                const db = new Dashboard();
                this.add(db);
                return db.setConfig(dc);
            }));
        } else {
            dashboardPromise = Promise.resolve();
        }
        return dashboardPromise.then(action(() => {
            this.setActiveIndex(value && !isNaN(value.activeIndex) ? value.activeIndex : -1);
            this.setCloseDisabled(value ? value.removeItemsDisabled : undefined);
            this.sync.syncEnd();
        }));
    }

    @action
    add(dashboard : IDashboard, makeActive: boolean = true) {
        if(dashboard.parent !== this) {
            dashboard.removeFromParent();
            dashboard.parent = this;
            this.dashboards.push(dashboard);
            if(!dashboard.component && this.addApp) {
                const s = new Stack();
                dashboard.setComponent(s);
                s.addNew();
            }
            if(makeActive) {
                this.active = dashboard;
            }
        }
    }

    private addDefaultDashboard() {
        if(this.dashboardCount === 0 && this.createDefaultDashboard && this.addApp) {
            const newDashboard = new Dashboard();
            newDashboard.setTitle("Dashboard 1");
            this.add(newDashboard, true);
        }
    }

    remove(node : IComponent) {
        const idx = this.dashboards.indexOf(node as IDashboard);
        if(idx >= 0) {
            const dashboard = this.dashboards[idx];
            dashboard.parent = undefined;
            this.dashboards.splice(idx, 1);
                       
            if(this.activeIndex >= this.dashboards.length) {
                this.setActiveIndex(this.dashboards.length - 1);
            }

            dashboard.close();

            if(this.dashboardCount === 0) {
                this.addDefaultDashboard();
            }
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
            if(this.dashboardCount === 0) {
                this.addDefaultDashboard();
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
            return this.loader().then(this._loadDone).catch(this._loadError);
        }
        return Promise.reject({ code: "ILLEGAL_STATE", message: "A loader has not been configured" });
    }

    protected _findFirstChild(predicate) {
        let r;
        this.dashboards.some(d => {
            r = d.findFirst(predicate);
            return r ? true : false;
        });
        return r;
    }

    protected _findAllChildren(predicate) : IComponent[] {
        let r = [];
        let dr;
        this.dashboards.forEach(d => {
            dr = d.findAll(predicate);
            if(dr && dr.length > 0) {
                r = r.concat(dr);
            }
        });
        return r;
    }

    @action
    close() {
        this.dashboards.forEach(db => db.close());
        this.dashboards = [];
        this.setActiveIndex(-1);
        this.addDefaultDashboard();
    }

    @action
    clear() {
        this.close();
    }
}

export { DashboardList }
