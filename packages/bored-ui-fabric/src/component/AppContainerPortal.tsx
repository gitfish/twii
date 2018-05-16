import * as ReactDOM from "react-dom";
import * as React from "react";
import { IPortal } from "@twii/bored/lib/model/IPortal";
import { IWindow } from "@twii/bored/lib/model/IWindow";
import { dispatchWindowResize } from "./DOMHelper";
import { AppHostContainer } from "@twii/core-ui-fabric/lib/component/AppHost";

class AppContainerPortal implements IPortal {
    private _root : HTMLElement;
    private _el : HTMLElement;
    private _window : IWindow;
    private _onDestroy : (window : IWindow) => void;
    constructor(root : HTMLElement, el : HTMLElement, window : IWindow, onDestroy?: (window : IWindow) => void) {
        this._root = root;
        this._el = el;
        this._window = window;
        this._onDestroy = onDestroy;
        ReactDOM.render(<AppHostContainer host={this._window.appHost} />, this._el);
    }
    setViewport(left: number, top: number, width: number, height: number) {
        const clientBounds = this._el.getBoundingClientRect();
        const sizeChanged = width !== clientBounds.width || height !== clientBounds.height;
        const visible = width > 0 && height > 0;
        const s = this._el.style;
        s.top = `${visible ? top : -1}px`;
        s.left = `${visible ? left : -1}px`;
        s.bottom = "";
        s.right = "";
        s.width = `${width}px`;
        s.height = `${height}px`;
        s.overflow = visible ? "auto" : "hidden";
        if(sizeChanged) {
            this._window.appHost.emit({ type: "resize" });
            dispatchWindowResize();
        }
    }
    destroy() {
        ReactDOM.unmountComponentAtNode(this._el);
        this._root.removeChild(this._el);
        if(this._onDestroy) {
            this._onDestroy(this._window);
        }
    }
}

export { AppContainerPortal }