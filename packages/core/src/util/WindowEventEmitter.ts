import { IEventEmitter } from "./IEventEmitter";

class WindowEventEmitter implements IEventEmitter {
    private _window : Window;
    constructor(window : Window) {
        this._window = window;
    }
    addEventListener(type, handler) : void {
        this._window.addEventListener(type, handler);
    }

    removeEventListener(type, handler) : void {
        this._window.addEventListener(type, handler);
    }

    emit(event) : void {
        this._window.dispatchEvent(event as Event);
    }
}

export { WindowEventEmitter }