import { IPortalManager } from "../model/IPortalManager";
import { AppContainerPortal } from "./AppContainerPortal";
import { IWindow } from "../model/IWindow";

class AppContainerPortalManager implements IPortalManager {
    private _root : HTMLElement;
    private _portalMap : { [key : string] : AppContainerPortal } = {};
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
            portal = new AppContainerPortal(this._root, el, window, this._onPortalDestroyed);
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

export { AppContainerPortalManager }