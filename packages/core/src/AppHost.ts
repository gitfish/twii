import { AbstractAppHost } from "./AbstractAppHost";
import { IEventEmitter } from "./IEventEmitter";
import { EventEmitter } from "./EventEmitter";
import { IRequest } from "@twii/router/lib/IRequest";

class AppHost extends AbstractAppHost {
    protected _events : IEventEmitter;
    private _defaultRequest : IRequest;

    get events() : IEventEmitter {
        if(!this._events) {
            this._events = new EventEmitter();
        }
        return this._events;
    }
    set events(value : IEventEmitter) {
        this.setEvents(value);
    }
    setEvents(events : IEventEmitter) {
        this._events = events;
    }

    close() {
        // does nothing
    }

    addEventListener(type, handler) : void {
        this.events.addEventListener(type, handler);
    }

    removeEventListener(type, handler) : void {
        this.events.addEventListener(type, handler);
    }

    emit(event) : void {
        this.events.emit(event);
    }

    get defaultRequest() {
        return {...this._defaultRequest};
    }
    set defaultRequest(value) {
        this.setDefaultRequest(value);
    }
    setDefaultRequest(defaultRequest : IRequest) {
        this._defaultRequest = defaultRequest;
    }

    open(request: IRequest) {
        if(this.launcher) {
            const launchRequest = { ...request, opener: this };
            return Promise.resolve(this.launcher(launchRequest));
        }
        // fall back to load if no launcher configured
        return this.load(request);
    }
}

export { AppHost }