import { observable, computed, action, reaction, autorun, IReactionDisposer } from "mobx";
import { Component } from "./Component";
import { IStack } from "./IStack";
import { IComponent } from "./IComponent";
import { IWindow } from "./IWindow";
import { Window } from "./Window";
import { IWindowManager } from "./IWindowManager";
import { IRequest } from "roota/lib/IRequest";
import * as ComponentTypes from "./ComponentTypes";

/**
 * Stack - a bunch/stack of windows
 */
class Stack extends Component implements IStack {
    private _type : string;
    @observable private _closeDisabled = false;
    @observable private _activeIndex : number;
    @observable windows : IWindow[] = [];

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
    get windowCount() {
        return this.windows ? this.windows.length : 0;
    }

    @computed
    get closeDisabled() {
        return this._closeDisabled || (this.dashboard && this.dashboard.closeDisabled);
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
    add(win : IWindow, makeActive: boolean = true) {
        if(win) {
            if(win.parent !== this) {
                win.removeFromParent();
                win.parent = this;
            } else {
                const itemIdx = this.windows.indexOf(win);
                this.windows.splice(itemIdx, 1);
            }
            this.windows.push(win);
            if(makeActive) {
                this.setActive(win);
            }
        }
    }

    @action
    open(request : IRequest) {
        let win;
        if(request && request.replace && request.name) {
            const db = this.dashboard;
            win = db.findFirst(w => {
                return w.type === "window" ? (w as Window).name === request.name : false;
            });
        }
        if(!win) {
            win = new Window();
            if(request) {
                win.setPath(request.path);
                win.setParams(request.params);
                win.setQuery(request.query);
                if(request.title) {
                    win.setTitle(request.title);
                }
            }
            this.add(win, request && request.makeActive !== undefined ? request.makeActive : true);
        } else {
            win.load(request);
        }
        return Promise.resolve(win);
    }

    @action
    addNew() {
        if(this.dashboard && this.dashboard.addApplet) {
            return this.open(this.dashboard.addApplet);
        }
        return Promise.resolve();
    }

    @action
    insertAt(item : IWindow, index : number) {
        if(item && index >= 0 && index < this.windows.length) {
            let refStackItem = this.windows[index];
            let insertIdx : number = -1;
            if(item.parent !== this) {
                item.removeFromParent();
                item.parent = this;
                insertIdx = index;
            } else {
                const itemIdx = this.windows.indexOf(item);
                if(itemIdx >= 0 && itemIdx !== index) {
                    this.windows.splice(itemIdx, 1);
                    insertIdx = this.windows.indexOf(refStackItem);
                }
            }

            if(insertIdx >= 0) {
                this.windows.splice(insertIdx, 0, item);
            }
        } else {
            this.add(item);
        }
    }

    @action
    dropWindow(refWindow?: IWindow) {
        const drag = this.dashboard ? this.dashboard.drag : undefined;
        if(drag) {
            const win = drag as IWindow;
            if(refWindow) {
                if(drag.parent === this) {
                    const dragIdx = this.windows.indexOf(win);
                    const refIdx = this.windows.indexOf(refWindow);
                    this.insertAt(win, dragIdx > refIdx ? refIdx : refIdx + 1);
                } else {
                    this.insertBefore(win, refWindow);
                }
            } else {
                this.add(win, false);
            }
            this.setActive(win);
            this.dashboard.clearDrag();
        }
    }

    @action
    splitLeft(newComp?: IComponent) {
        const right = this;
        return import("./Split").then(m => {
            const split = new m.HSplit();
            const newStack = new Stack();
            newStack.setCloseDisabled(this._closeDisabled);
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
            newStack.setCloseDisabled(this._closeDisabled);
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
            newStack.setCloseDisabled(this._closeDisabled);
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
            newStack.setCloseDisabled(this._closeDisabled);
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

    @action
    insertBefore(item : IWindow, refItem?: IWindow) {
        if(!refItem) {
            this.add(item);
        } else if(item) {
            this.insertAt(item, this.windows.indexOf(refItem));
        }
    }

    @action
    replace(newItem : IComponent, oldItem : IComponent) : void {
        if(newItem && oldItem && oldItem.parent === this) {
            this.insertBefore(newItem as IWindow, oldItem as IWindow);
            oldItem.removeFromParent();
        }
    }

    @computed
    get config() {
        return {
            type: this.type,
            activeIndex: this.activeIndex,
            windows: this.windows.map(w => w.config),
            closeDisabled: this._closeDisabled
        };
    }

    @action
    setConfig(config : any) : Promise<any> {
        this.windows = [];
        let windowPromise;
        if(config && config.windows && config.windows.length > 0) {
            windowPromise = Promise.all(config.windows.map(wc => {
                const w = new Window();
                this.add(w, false);
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
        const idx = this.windows.indexOf(node as IWindow);
        if(idx >= 0) {
            const w = this.windows[idx];
            w.parent = undefined;
            this.windows.splice(idx, 1);

            if(this.windows.length === 0) {
                this.removeFromParent();
            } else if(this.windows.length > 0) {
                if(this.activeIndex >= this.windows.length) {
                    this.setActiveIndex(this.windows.length - 1);
                }
            }
        }
    }

    @action
    private _replaceWithListModuleLoaded = (m) => {
        const active = this.active;
        const list = new m.List();
        list.setCloseDisabled(this._closeDisabled);
        this.parent.replace(list, this);
        while(this.windows.length > 0) {
            list.add(this.windows[0], false);
        }
        list.setActive(active);
        if(active) {
            list.setPendingScrollTo(active);
        }
    }

    protected _visitChildren(callback) {
        this.windows.forEach(w => w.visit(callback));
    }

    protected _findFirstChild(predicate) {
        let r;
        this.windows.some(w => {
            r = w.findFirst(predicate);
            return r ? true : false;
        });
        return r;
    }

    protected _findAllChildren(predicate) : IComponent[] {
        let r = [];
        let wr;
        this.windows.forEach(w => {
            wr = w.findAll(predicate);
            if(wr && wr.length > 0) {
                r = r.concat(wr);
            }
        });
        return r;
    }

    @action
    close() {
        this.unmount();
        this.removeFromParent();
    }

    @action
    unmount() {
        this.windows.forEach(w => w.unmount());
    }
}

export { Stack }