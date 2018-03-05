import { observable, computed, action } from "mobx";
import { IComponent } from "./IComponent";
import { IDashboard } from "./IDashboard";
import { IWindow } from "./IWindow";
import { ComponentIdSequence } from "../ComponentIdSequence";
import { isFunction } from "lodash.isfunction";
import { IRequest } from "roota/lib/IRequest";
import { EventEmitter } from "@twii/core/lib/common/EventEmitter";
import { ComponentGlobals } from "../ComponentGlobals";
import { isEqual } from "lodash.isequal";
import { IConsumerFunc } from "@twii/core/lib/common/IConsumerFunc";
import { IPredicateFunc } from "@twii/core/lib/common/IPredicateFunc";
import { ISupplierFunc } from "@twii/core/lib/common/ISupplierFunc";

abstract class Component extends EventEmitter {
    private _id : string;
    @observable.ref parent : IComponent;
    @observable private _addApp : IRequest;
    @observable.ref private _addAppSupplier : ISupplierFunc<IRequest>;
    type : string;

    constructor() {
        super();
        this._id = ComponentIdSequence.next();
    }

    get id() {
        return this._id;
    }

    get top() {
        return this.parent ? this.parent.top : this;
    }

    @computed
    get addApp() {
        if(this._addApp !== undefined) {
            return this._addApp;
        }
        const p = this.parent;
        if(p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.addApp : undefined;
    }

    set addApp(addApp : IRequest) {
        this.setAddApp(addApp);
    }

    @action
    setAddApp(addApp : IRequest) {
        this._addApp = addApp;
    }

    @computed
    get addAddSupplier() {
        if(this._addAppSupplier !== undefined) {
            return this._addAppSupplier;
        }
        const p = this.parent;
        if(p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.addAppSupplier : undefined;
    }

    set addAppSupplier(value) {
        this.setAddAppSupplier(value);
    }

    @action
    setAddAppSupplier(addAddSupplier : ISupplierFunc<IRequest>) {
        this._addAppSupplier = addAddSupplier;
    }

    @computed
    get dashboard() {
        const p = this.parent;
        if(p === this) {
            console.warn("-- Dashboard Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.dashboard : undefined;
    }

    remove(comp : IComponent) : void {
        // does nothing by default
    }

    removeFromParent() {
        if(this.parent) {
            this.parent.remove(this);
            this.parent = undefined;
        }
    }

    replace(newItem : IComponent, oldItem : IComponent) : void {
        // does nothing by default
    }

    get config() {
        // default impl
        return undefined;
    }

    @action
    setConfig(config : any) : Promise<any> {
        return Promise.resolve();
    }

    protected _visitChildren(callback : IConsumerFunc<IComponent>) : void {
        // does nothing by default
    }

    visit(callback : IConsumerFunc<IComponent>) : void {
        callback(this);
    }

    protected _findFirstChild(predicate : IPredicateFunc<IComponent>) : IComponent {
        return undefined;
    }

    findFirst(predicate : IPredicateFunc<IComponent>) : IComponent {
        if(predicate(this)) {
            return this;
        }
        return this._findFirstChild(predicate);
    }

    protected _findAllChildren(predicate : IPredicateFunc<IComponent>) : IComponent[] {
        return [];
    }

    findAll(predicate : IPredicateFunc<IComponent>) : IComponent[] {
        let r = [];
        if(predicate(this)) {
            r.push(this);
        }
        const tr = this._findAllChildren(predicate);
        if(tr && tr.length > 0) {
            r = r.concat(tr);
        }
        return r;
    }

    @action
    close() {
        // does nothing by default
    }

    toJSON() {
        return this.config;
    }
}

export { Component }