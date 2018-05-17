import { IWindowManager } from "./IWindowManager";
import { observable, computed, action } from "mobx";
import { IWindow } from "./IWindow";
import { Window } from "./Window";
import { Component } from "./Component";
import { isFunction } from "@twii/core/lib/LangUtils";
import { ISupplierFunc } from "@twii/core/lib/ISupplierFunc";
import { IRequest } from "@twii/router/lib/IRequest";
import { IComponent } from "./IComponent";

class WindowManager extends Component implements IWindowManager {
    @observable private _closeDisabled = false;
    @observable windows : IWindow[] = [];

    get type() {
        return null;
    }

    get decorateWindow() {
        return false;
    }

    get windowHeaderHeight() {
        return 0;
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
    get windowCount() : number {
        return this.windows ? this.windows.length : 0
    }

    get isWindowManager() {
        return true;
    }

    @action
    add(win : IWindow, opts?: any) : void {
        if(win) {
            if(win.parent !== this) {
                win.removeFromParent();
                win.parent = this;
            } else {
                const itemIdx = this.windows.indexOf(win);
                this.windows.splice(itemIdx, 1);
            }
            this.windows.push(win);
        }
    }
    
    @action
    addNew(opts?: any) {
        if(this.addApp) {
            let addApp = isFunction(this.addApp) ? (this.addApp as ISupplierFunc<IRequest>)() : this.addApp;
            if(opts) {
                addApp = Object.assign({}, addApp, opts);
            }
            return this.open(addApp);
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

    protected _windowDropped(win : IWindow) {
        // does nothing by default
    }

    @action
    dropWindow(refWindow?: IWindow) : void {
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
                this.add(win);
            }
            this._windowDropped(win);
            this.dashboard.clearDrag();
        }
    }

    @action
    open(request : IRequest) : Promise<IWindow> {
        let win;
        if(request && request.replace && request.name) {
            const db = this.dashboard;
            win = db.findFirst(w => {
                return w.type === "window" ? (w as IWindow).name === request.name : false;
            });
        }
        if(!win) {
            win = new Window();
            if(request) {
                win.name = request.name;
                win.setPath(request.path);
                win.setParams(request.params);
                win.setQuery(request.query);
                if(request.title) {
                    win.setTitle(request.title);
                }
                if(request.transient !== undefined) {
                    win.setTransient(request.transient);
                }
            }
            this.add(win, request);
        } else {
            win.load(request);
        }
        return Promise.resolve(win);
    }
    
    @computed
    get closeDisabled() : boolean {
        return this._closeDisabled;
    }
    set closeDisabled(value) {
        this.setCloseDisabled(value);
    }
    @action
    setCloseDisabled(closeDisabled : boolean) : void {
        this._closeDisabled = closeDisabled;
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
    remove(node : IComponent) {
        const idx = this.windows.indexOf(node as IWindow);
        if(idx >= 0) {
            const w = this.windows[idx];
            w.parent = undefined;
            this.windows.splice(idx, 1);

            if(this.windows.length === 0) {
                this.removeFromParent();
            }
        }
    }

    @action
    close() {
        if(!this.closeDisabled) {
            while(this.windowCount > 0) {
                this.windows[0].close();
            }
            this.removeFromParent();
        }
    }
}

export { WindowManager }