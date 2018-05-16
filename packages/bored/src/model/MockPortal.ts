import { IPortal } from "./IPortal";
import { IPortalManager } from "./IPortalManager";
import { IWindow } from "./IWindow";

class MockPortal implements IPortal {
    window: IWindow;
    left: number;
    top: number;
    width: number;
    height: number
    destroyed: boolean = false;
    constructor(window : IWindow) {
        this.window = window;
    }
    setViewport(left : number, top: number, width: number, height: number) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    destroy() {
        this.destroyed = true;
    }
}

class MockPortalManager implements IPortalManager {
    portals : MockPortal[] = [];
    getPortal(window : IWindow) {
        let p = this.portals.find(p => p.window === window);
        if(!p) {
            p = new MockPortal(window);
            this.portals.push(p);
        }
        return p;
    }
    destroyPortal(window : IWindow) {
        const idx = this.portals.findIndex(p => p.window === window);
        if(idx >= 0) {
            this.portals.splice(idx, 1);
        }
    }
    destroy() {
        this.portals.forEach(p => p.destroy());
    }
}

export { MockPortalManager, MockPortal }