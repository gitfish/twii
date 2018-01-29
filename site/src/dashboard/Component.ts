import { observable, computed, action } from "mobx";
import { IComponent, IComponentPredicate, IComponentCallback } from "./IComponent";
import IWindow from "./IWindow";
import ComponentIdSequence from "./ComponentIdSequence";
import { isFunction } from "util/Lang";
import IRequest from "roota/lib/IRequest";
import Router from "roota/lib/Router";
import EventEmitter from "util/EventEmitter";
import { removeAllChildren } from "./DOMHelper";
import ComponentGlobals from "./ComponentGlobals";
import isEqual from "lodash.isequal";

abstract class Component extends EventEmitter {
    private _id : string;
    @observable.ref parent : IComponent;
    @observable private _addApplet : IRequest;
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
    get addApplet() {
        if(this._addApplet !== undefined) {
            return this._addApplet;
        }
        const p = this.parent;
        if(p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.addApplet : undefined;
    }

    set addApplet(addApplet : IRequest) {
        this.setAddApplet(addApplet);
    }

    @action
    setAddApplet(addApplet : IRequest) {
        this._addApplet = addApplet;
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

    protected _visitChildren(callback : IComponentCallback) : void {
        // does nothing by default
    }

    visit(callback : IComponentCallback) : void {
        callback(this);
    }

    protected _findFirstChild(predicate : IComponentPredicate) : IComponent {
        return undefined;
    }

    findFirst(predicate : IComponentPredicate) : IComponent {
        if(predicate(this)) {
            return this;
        }
        return this._findFirstChild(predicate);
    }

    protected _findAllChildren(predicate : IComponentPredicate) : IComponent[] {
        return [];
    }

    findAll(predicate : IComponentPredicate) : IComponent[] {
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
    unmount() {
        // does nothing by default
    }

    toJSON() {
        return this.config;
    }
}

export { Component as default, Component }