import { Dashboard } from "model/Dashboard";
import { Stack } from "model/Stack";
import { IWindow } from "model/IWindow";
import { Window } from "model/Window";
import { IPortal } from "model/IPortal";
import { IPortalManager } from "model/IPortalManager";
import * as qs from "qs";

class TestPortal implements IPortal {
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

class TestPortalManager implements IPortalManager {
    portals : TestPortal[] = [];
    getPortal(window : IWindow) {
        let p = this.portals.find(p => p.window === window);
        if(!p) {
            p = new TestPortal(window);
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

describe("Stack Test", () => {
    test("basic test", async () => {

    });;

    test("viewport test", async () => {
        const portalManager = new TestPortalManager();
        const db = new Dashboard();
        db.setPortalManager(portalManager);
        const stack = new Stack();
        stack.headerHeight = 32;
        const window = new Window();
        window.path = "/woo";
        stack.add(window, { makeActive: true });
        db.component = stack;
        db.setViewport(0, 0, 600, 400);
        expect(window.width).toBeGreaterThan(0);
        expect(window.height).toBeGreaterThan(0);
        // check the size of the viewport for the window
        let portal = portalManager.getPortal(window);
        expect(portal.left).toBe(0);
        expect(portal.top).toBe(32);
        expect(portal.width).toBe(window.width);
        expect(portal.height).toBe(window.height);
        const newWindow = new Window();
        newWindow.path = "/bar";
        stack.add(newWindow, { makeActive: true });

        // original portal should now have width and height of 0 as it's no longer active
        portal = portalManager.getPortal(window);
        expect(portal.left).toBe(0);
        expect(portal.top).toBe(32);
        expect(portal.width).toBe(0);
        expect(portal.height).toBe(0);

        // check out the new window setup
        expect(newWindow.width).toBeGreaterThan(0);
        expect(newWindow.height).toBeGreaterThan(0);
        portal = portalManager.getPortal(newWindow);
        expect(portal.left).toBe(0);
        expect(portal.top).toBe(32);
        expect(portal.width).toBe(newWindow.width);
        expect(portal.height).toBe(newWindow.height);
    });
});