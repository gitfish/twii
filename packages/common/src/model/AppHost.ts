import { AbstractAppHost } from "./AbstractAppHost";
import { IEventEmitter } from "../IEventEmitter";
import { EventEmitter } from "../EventEmitter";
import { IRequest } from "@pu/router/lib/IRequest";

class AppHost extends AbstractAppHost {
    protected _events : IEventEmitter = new EventEmitter();

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