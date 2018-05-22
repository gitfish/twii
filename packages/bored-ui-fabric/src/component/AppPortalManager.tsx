import * as ReactDOM from "react-dom";
import * as React from "react";
import { IPortal } from "@twii/bored/lib/model/IPortal";
import { IPortalManager } from "@twii/bored/lib/model/IPortalManager";
import { IWindow } from "@twii/bored/lib/model/IWindow";
import { dispatchWindowResize } from "./DOMHelper";
import { AppHostContainer } from "@twii/core-ui-fabric/lib/component/AppHost";
import { Window } from "./Window";

class AppPortal implements IPortal {
    private _root : HTMLElement;
    private _el : HTMLElement;
    private _window : IWindow;
    private _onDestroy : (window : IWindow) => void;
    constructor(root : HTMLElement, el : HTMLElement, window : IWindow, onDestroy?: (window : IWindow) => void) {
        this._root = root;
        this._el = el;
        this._window = window;
        this._onDestroy = onDestroy;
        ReactDOM.render(
            <Window window={this._window}>
                <AppHostContainer host={this._window.appHost} />
            </Window>
        , this._el);
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

class AppPortalManager implements IPortalManager {
    private _root : HTMLElement;
    private _portalMap : { [key : string] : AppPortal } = {};
    constructor(root : HTMLElement) {
        this._root = root;
    }
    private _onPortalDestroyed = (window : IWindow) => {
        delete this._portalMap[window.id];
    }
    getPortal(window : IWindow) {
        let portal = this._portalMap[window.id];
        if(!portal) {
            const doc = this._root.ownerDocument;
            const el = doc.createElement("div");
            const s = el.style;
            s.position = "absolute";
            s.zIndex = "1";
            this._root.appendChild(el);
            portal = new AppPortal(this._root, el, window, this._onPortalDestroyed);
            this._portalMap[window.id] = portal;
        }
        return portal;
    }
    destroyPortal(window : IWindow) {
        const portal = this._portalMap[window.id];
        if(portal) {
            portal.destroy();
        }
    }
    destroy() {
        Object.keys(this._portalMap).forEach(key => {
            this._portalMap[key].destroy();
        });
    }
}

export { AppPortal, AppPortalManager }