import { autorun } from "mobx";
import { Dashboard } from "./Dashboard";
import { Stack } from "./Stack";
import { IWindow } from "./IWindow";
import { Window } from "./Window";
import { MockPortalManager, MockPortal } from "./MockPortal";
import * as ComponentTypes from "./ComponentTypes";
import { ComponentFactory } from "./ComponentFactory";
import { Component } from "./Component";

describe("Stack Test", () => {
    test("stack basic test", () => {
        const db = new Dashboard();
        db.componentFactory = ComponentFactory;
        const portalManager = new MockPortalManager();
        db.portalManager = portalManager;
        
        const stack = new Stack();
        expect(stack.windowCount).toBe(0);
        expect(stack.dashboard).toBeFalsy();

        db.component = stack;
        expect(stack.dashboard).toBe(db);

        const w = new Window();
        w.path = "/woo";
        stack.add(w, { makeActive: true });
        expect(stack.windowCount).toBe(1);
        expect(stack.activeIndex).toBe(0);
        expect(stack.active).toBe(w);
        expect(w.parent).toBe(stack);
        expect(w.active).toBeTruthy();

        const w2 = new Window();
        w.path = "/bar";
        stack.add(w2, { makeActive: false });
        expect(stack.windowCount).toBe(2);
        expect(stack.activeIndex).toBe(0);
        expect(stack.active).toBe(w);
        expect(w2.parent).toBe(stack);

        w2.activate();

        expect(stack.activeIndex).toBe(1);
        expect(stack.active).toBe(w2);

        w2.close();

        expect(stack.windowCount).toBe(1);
        expect(stack.activeIndex).toBe(0);
        expect(stack.active).toBe(w);
        expect(w.active).toBeTruthy();
    });

    test("stack config set test", () => {
        const stack = new Stack();
        stack.componentFactory = ComponentFactory;
        stack.config = {
            type: "stack",
            activeIndex: 1,
            closeDisabled: false,
            windows: [
                {
                    type: "window",
                    path: "/woo"
                },
                {
                    type: "window",
                    path: "/bar"
                }
            ]
        };

        expect(stack.windowCount).toBe(2);
        expect(stack.windows[0].path).toBe("/woo");
        expect(stack.windows[1].path).toBe("/bar");
        expect(stack.activeIndex).toBe(1);
        expect(stack.active).toBe(stack.windows[1]);
    });

    test("stack config observe test", () => {
        const stack = new Stack();
        stack.componentFactory = ComponentFactory;
        let config : any;
        autorun(() => {
            config = stack.config;
        });

        expect(config.type).toBe(ComponentTypes.stack);
        expect(config.activeIndex).toBeFalsy();
        expect(config.windows.length).toBe(0);

        // add in a window
        const w = new Window();
        w.path = "/woo";

        stack.add(w);

        expect(config.activeIndex).toBe(0);
        expect(config.windows.length).toBe(1);
        expect(config.windows[0].path).toBe(w.path);

        // adding a transient window shouldn't change the config
        const tw = new Window();
        tw.path = "/bar";
        tw.transient = true;

        stack.add(tw);

        expect(config.activeIndex).toBe(0);
        expect(config.windows.length).toBe(1);
        expect(config.windows[0].path).toBe(w.path);

        // changing the window to non-transient
        tw.transient = false;

        expect(config.activeIndex).toBe(0);
        expect(config.windows.length).toBe(2);
        expect(config.windows[0].path).toBe(w.path);
        expect(config.windows[1].path).toBe(tw.path);
    });

    test("stack viewport test", () => {
        const db = new Dashboard();
        db.componentFactory = ComponentFactory;
        const portalManager = new MockPortalManager();
        db.portalManager = portalManager;
        const stack = new Stack();
        stack.headerHeight = 32;
        const window = new Window();
        window.path = "/woo";
        stack.add(window, { makeActive: true });
        db.component = stack;
        db.setViewport(0, 0, 600, 400);
        
        // stack dimensions should match dashboard
        expect(stack.width).toBe(db.width);
        expect(stack.height).toBe(db.height);

        expect(window.width).toBeGreaterThan(0);
        expect(window.height).toBeGreaterThan(0);
        expect(window.width).toBe(600);
        expect(window.height).toBe(368);
        // check the size of the viewport for the window
        let portal = portalManager.getPortal(window);
        expect(portal.left).toBe(0);
        expect(portal.top).toBe(stack.headerHeight);
        expect(portal.width).toBe(window.width);
        expect(portal.height).toBe(window.height);
        const newWindow = new Window();
        newWindow.path = "/bar";
        stack.add(newWindow, { makeActive: true });

        // original portal should now have width and height of 0 as it's no longer active
        portal = portalManager.getPortal(window);
        expect(portal.left).toBe(0);
        expect(portal.top).toBe(stack.headerHeight);
        expect(portal.width).toBe(0);
        expect(portal.height).toBe(0);

        // check out the new window setup
        expect(newWindow.width).toBeGreaterThan(0);
        expect(newWindow.height).toBeGreaterThan(0);
        expect(newWindow.width).toBe(600);
        expect(newWindow.height).toBe(368);
        portal = portalManager.getPortal(newWindow);
        expect(portal.left).toBe(0);
        expect(portal.top).toBe(stack.headerHeight);
        expect(portal.width).toBe(newWindow.width);
        expect(portal.height).toBe(newWindow.height);
    });
});