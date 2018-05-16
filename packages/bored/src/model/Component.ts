import { observable, computed, action } from "mobx";
import { IComponent } from "./IComponent";
import { IDashboard } from "./IDashboard";
import { IWindow } from "./IWindow";
import { ComponentIdSequence } from "../ComponentIdSequence";
import { IRouter } from "@twii/router/lib/IRouter";
import { IRequest } from "@twii/router/lib/IRequest";
import { EventEmitter } from "@twii/core/lib/EventEmitter";
import { IConsumerFunc } from "@twii/core/lib/IConsumerFunc";
import { IPredicateFunc } from "@twii/core/lib/IPredicateFunc";
import { ISupplierFunc } from "@twii/core/lib/ISupplierFunc";

abstract class Component {
    private _id : string;
    @observable.ref parent : IComponent;
    @observable.ref private _addApp : IRequest | ISupplierFunc<IRequest>;
    @observable.ref private _router : IRouter;
    @observable private _x : number = 0;
    @observable private _y : number = 0;
    @observable private _width : number = 0;
    @observable private _height : number = 0;
    type : string;

    get id() {
        if(!this._id) {
            this._id = ComponentIdSequence.next();
        }
        return this._id;
    }

    get isWindowManager() {
        return false;
    }

    @computed
    get root() {
        return this.parent ? this.parent.root : this;
    }

    @computed
    get x() {
        return this._x;
    }

    @computed
    get y() {
        return this._y;
    }

    @computed
    get width() {
        return this._width;
    }

    @computed
    get height() {
        return this._height;
    }

    @action
    resize(width : number, height : number) {
        if((width >= 0 && width !== this._width) || (height >= 0 && height !== this._height)) {
            this._width = width;
            this._height = height;
        }
    }

    @action
    position(x : number, y : number) {
        this._x = x;
        this._y = y;
    }

    @action
    setViewport(x : number, y : number, width : number, height : number) {
        this.position(x, y);
        this.resize(width, height);
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

    set addApp(addApp : IRequest | ISupplierFunc<IRequest>) {
        this.setAddApp(addApp);
    }

    @action
    setAddApp(addApp : IRequest | ISupplierFunc<IRequest>) {
        this._addApp = addApp;
    }
    
    @computed
    get router() {
        if(this._router !== undefined) {
            return this._router;
        }
        const p = this.parent;
        if(p === this) {
            console.warn("-- Ancestor Resolution Cycle Detected");
            return undefined;
        }
        return p ? p.router : undefined;
    }
    set router(value) {
        this.setRouter(value);
    }
    
    @action
    setRouter(router : IRouter) {
        this._router = router;
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