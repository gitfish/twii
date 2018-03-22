import { action } from "mobx";
import { IAppHost } from "@twii/common/lib/IAppHost";
import { AbstractAppHost } from "@twii/common/lib/model/AbstractAppHost";
import { IRequest } from "roota/lib/IRequest";
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