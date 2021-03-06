import { action } from "mobx";
import { IAppHost } from "@twii/common/lib/IAppHost";
import { AbstractAppHost } from "@twii/common/lib/model/AbstractAppHost";
import { IRouter } from "@twii/common/lib/IRouter";
import { IRequest } from "@twii/common/lib/IRequest";
import { IWindow } from "./IWindow";
import { EventEmitter } from "@twii/common/lib/EventEmitter";

class WindowAppHost extends AbstractAppHost {
    private _window : IWindow;
    protected _events = new EventEmitter();
    
    constructor(window : IWindow) {
        super();
        this._window = window;
    }

    get defaultRequest() {
        return { path: this._window.path, params: this._window.params, query: this._window.query };
    }
    
    get router() : IRouter {
        return this._window.router;
    }
    set router(value : IRouter) {
        this.setRouter(value);
    }
    
    @action
    setRouter(router : IRouter) {
        this._window.setRouter(router);
    }

    open(request: IRequest) : Promise<IAppHost> {
        return this._window.open(request).then(w => {
            return w.appHost;
        });
    }

    @action
    setRequest(request : IRequest) {
        super.setRequest(request);
        if(request && request.replace && !request.noUpdate && !request.noSaveLocation) {
            this._window.setPath(request.path);
            this._window.setParams(request.params);
            this._window.setQuery(request.query);
        }
    }

    close() {
        this._window.close();
    }

    addEventListener(type, handler) : void {
        this._events.addEventListener(type, handler);
    }

    removeEventListener(type, handler) : void {
        this._events.addEventListener(type, handler);
    }

    emit(event) : void {
        this._events.emit(event);
    }
}

export { WindowAppHost as default, WindowAppHost }