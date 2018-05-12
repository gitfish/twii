import { AbstractAppHost } from "./AbstractAppHost";
import { IEventEmitter } from "../IEventEmitter";
import { EventEmitter } from "../EventEmitter";
import { IRequest } from "@twii/router/lib/IRequest";

class AppHost extends AbstractAppHost {
    protected _events : IEventEmitter = new EventEmitter();
    private _defaultRequest : IRequest;

    get defaultRequest() : IRequest {
        return Object.assign({}, this._defaultRequest);
    }
    set defaultRequest(value : IRequest) {
        this.setDefaultRequest(value);
    }
    setDefaultRequest(defaultRequest : IRequest) {
        this._defaultRequest = defaultRequest;
    }

    open(request: IRequest) {
        const url = this.getUrl(request);
        const newHost = new AppHost();
        newHost.router = this.router;
        return Promise.resolve(newHost);
    }

    close() {
        // does nothing
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

export { AppHost }