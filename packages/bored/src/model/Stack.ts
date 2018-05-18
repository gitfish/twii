import { observable, computed, action, reaction, autorun, IReactionDisposer } from "mobx";
import { Component } from "./Component";
import { IStack } from "./IStack";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";
import { Window } from "./Window";
import { IWindowManager } from "./IWindowManager";
import { IRequest } from "@twii/router/lib/IRequest";
import { isFunction } from "@twii/core/lib/LangUtils";
import { ISupplierFunc } from "@twii/core/lib/ISupplierFunc";
import * as ComponentTypes from "./ComponentTypes";
import { WindowManager } from "./WindowManager";
import { splitHorizontal, splitVertical } from "../SplitActions";

/**
 * Stack - a bunch/stack of windows
 */
class Stack extends WindowManager implements IStack {
    private _type : string;
    @observable private _activeIndex : number;
    @observable private _headerHeight : number = 28;
    private _setViewportDisposer : IReactionDisposer;

    constructor() {
        super();
        this._setViewportDisposer = autorun(this._setWindowViewports);
    }
    
    get type() {
        return ComponentTypes.stack;
    }
    
    @computed
    get headerHeight() {
        return this._headerHeight;
    }
    set headerHeight(value) {
        this.setHeaderHeight(value);
    }
    @action
    setHeaderHeight(headerHeight : number) {
        if(headerHeight >= 0 && headerHeight !== this._headerHeight) {
            this._headerHeight = headerHeight;
        }
    }

    @computed
    get activeIndex() {
        return this._activeIndex || 0;
    }
    set activeIndex(value) {
        this.setActiveIndex(value);
    }

    @action
    setActiveIndex(activeIndex : number) {
        if(activeIndex !== this._activeIndex) {
            this._activeIndex = activeIndex;
        }
    }

    @computed
    get active() : IWindow {
        return this.activeIndex >= 0 && this.activeIndex < this.windows.length ? this.windows[this.activeIndex] : undefined;
    }
    set active(value : IWindow) {
        this.setActive(value);
    }

    @action
    setActive(active : IWindow) {
        this.setActiveIndex(this.windows.indexOf(active));
    }

    @action
    add(win : IWindow, opts?: any) {
        super.add(win, opts);
        if((opts && opts.makeActive) || this.windows.length === 1) {
            this.setActive(win);
        }
    }

    protected _windowDropped(win) {
        this.setActive(win);
    }

    @action
    splitLeft(newComp?: IComponent) {
        const newStack = new Stack();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as IWindow);
        } else {
            newStack.addNew();
        }
        splitHorizontal(this, newStack, this);
    }

    @action
    splitRight(newComp?: IComponent) {
        const newStack = new Stack();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as IWindow);
        } else {
            newStack.addNew();
        }
        splitHorizontal(this, this, newStack);
    }

    @action
    splitTop(newComp?: IComponent) {
        const newStack = new Stack();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as IWindow);
        } else {
            newStack.addNew();
        }
        splitVertical(this, newStack, this);
    }

    @action
    splitBottom(newComp?: IComponent) {
        const newStack = new Stack();
        newStack.setCloseDisabled(this.closeDisabled);
        if(newComp) {
            newStack.add(newComp as IWindow);
        } else {
            newStack.addNew();
        }
        splitVertical(this, this, newStack);
    }

    @computed
    get config() {
        return {
            type: this.type,
            activeIndex: this.activeIndex,
            windows: this.windows.filter(w => !w.transient).map(w => w.config),
            closeDisabled: this.closeDisabled
        };
    }
    set config(value) {
        this.setConfig(value);
    }
    @action
    setConfig(config : any) : void {
        this.windows = [];
        let windowPromise;
        if(config && config.windows && config.windows.length > 0) {
            config.windows.forEach(wc => {
                const w = new Window();
                this.add(w);
                w.setConfig(wc);
            });
        }
        this.setActiveIndex(config && !isNaN(config.activeIndex) ? config.activeIndex : 0);
        this.setCloseDisabled(config ? config.closeDisabled : undefined);
    }

    @action
    remove(node : IComponent) {
        super.remove(node);
        if(this.windows.length > 0) {
            if(this.activeIndex >= this.windows.length) {
                this.setActiveIndex(this.windows.length - 1);
            }
        }
    }

    private _setWindowViewports = () => {
        if(this.portalManager) {
            const childY = this.y + this.headerHeight;
            const childHeight = this.height - this.headerHeight;
            const active = this.active;
            this.windows.forEach(w => {
                w.setViewport(this.x, childY, w === active ? this.width : 0, w === active ? childHeight : 0);
            });
        }
    }
}

export { Stack }