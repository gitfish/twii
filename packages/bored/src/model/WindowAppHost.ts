import { action } from "mobx";
import { IAppHost } from "@twii/core/lib/IAppHost";
import { AbstractAppHost } from "@twii/core/lib/model/AbstractAppHost";
import { IRouter } from "@twii/router/lib/IRouter";
import { IRequest } from "@twii/router/lib/IRequest";
import { IWindow } from "./IWindow";

class WindowAppHost extends AbstractAppHost {
    private _window : IWindow;
    
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
        if(request && request.replace) {
            this._window.setPath(request.path);
            this._window.setParams(request.params);
            this._window.setQuery(request.query);
        }
    }

    close() {
        this._window.close();
    }

    addEventListener(type, handler) : void {
        this._window.addEventListener(type, handler);
    }

    removeEventListener(type, handler) : void {
        this._window.addEventListener(type, handler);
    }

    emit(event) : void {
        this._window.emit(event);
    }
}

export { WindowAppHost as default, WindowAppHost }