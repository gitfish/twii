import { observable, computed, action, reaction, autorun, IReactionDisposer } from "mobx";
import { Component } from "./Component";
import { IStack } from "./IStack";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";
import { Window } from "./Window";
import { IWindowManager } from "./IWindowManager";
import { IRequest } from "@twii/router/lib/IRequest";
import { isFunction } from "@twii/common/lib/LangUtils";
import { ISupplierFunc } from "@twii/common/lib/ISupplierFunc";
import * as ComponentTypes from "./ComponentTypes";
import { WindowManager } from "./WindowManager";

/**
 * Stack - a bunch/stack of windows
 */
class Stack extends WindowManager implements IStack {
    private _type : string;
    @observable private _activeIndex : number;

    constructor() {
        super();
        this.addEventListener("resize", this._onResize);
    }

    notifyResizeWindows() : void {
        this.windows.forEach(w => w.emit({ type: "resize" }));
    }

    private _onResize = () => {
        this.notifyResizeWindows();
    }
    
    get type() {
        return ComponentTypes.stack;
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
    get first() {
        return this.windowCount > 0 ? this.windows[0] : undefined;
    }

    @computed
    get last() {
        return this.windowCount > 0 ? this.windows[this.windows.length - 1] : undefined;
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
        if(opts && opts.makeActive) {
            this.setActive(win);
        }
    }

    protected _windowDropped(win) {
        this.setActive(win);
    }

    @action
    splitLeft(newComp?: IComponent) {
        const right = this;
        return import("./Split").then(m => {
            const split = new m.HSplit();
            const newStack = new Stack();
            newStack.setCloseDisabled(this.closeDisabled);
            split.setLeft(newStack);
            this.parent.replace(split, this);
            if(newComp) {
                newStack.add(newComp as IWindow);
            } else {
                newStack.addNew();
            }
            split.setRight(this);
        });
    }

    @action
    splitRight(newComp?: IComponent) {
        const left = this;
        return import("./Split").then(m => {
            const split = new m.HSplit();
            const newStack = new Stack();
            newStack.setCloseDisabled(this.closeDisabled);
            split.setRight(newStack);
            this.parent.replace(split, this);
            if(newComp) {
                newStack.add(newComp as IWindow);
            } else {
                newStack.addNew();
            }
            split.setLeft(this);
        });
    }

    @action
    splitTop(newComp?: IComponent) {
        const bottom = this;
        return import("./Split").then(m => {
            const split = new m.VSplit();
            const newStack = new Stack();
            newStack.setCloseDisabled(this.closeDisabled);
            split.setTop(newStack);
            this.parent.replace(split, this);
            if(newComp) {
                newStack.add(newComp as IWindow);
            } else {
                newStack.addNew();
            }
            split.setBottom(bottom);
        });
    }

    @action
    splitBottom(newComp?: IComponent) {
        const top = this;
        return import("./Split").then(m => {
            const split = new m.VSplit();
            const newStack = new Stack();
            newStack.setCloseDisabled(this.closeDisabled);
            split.setBottom(newStack);
            this.parent.replace(split, this);
            if(newComp) {
                newStack.add(newComp as IWindow);
            } else {
                newStack.addNew();
            }
            split.setTop(top);
        });
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

    @action
    setConfig(config : any) : Promise<any> {
        this.windows = [];
        let windowPromise;
        if(config && config.windows && config.windows.length > 0) {
            windowPromise = Promise.all(config.windows.map(wc => {
                const w = new Window();
                this.add(w);
                return w.setConfig(wc);
            }));
        } else {
            windowPromise = Promise.resolve();
        }
        return windowPromise.then(action(() => {
            this.setActiveIndex(config && !isNaN(config.activeIndex) ? config.activeIndex : 0);
            this.setCloseDisabled(config ? config.closeDisabled : undefined);
        }));
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
}

export { Stack }