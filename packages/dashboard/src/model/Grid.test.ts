import { autorun } from "mobx";
import { Dashboard } from "./Dashboard";
import { Grid } from "./Grid";
import { Window } from "./Window";
import * as ComponentTypes from "./ComponentTypes";
import { ComponentFactory } from "./ComponentFactory";
import { WindowResizeType } from "./WindowResizeType";

describe("Grid Test", () => {
    test("grid basic test", () => {
        const db = new Dashboard();
        db.componentFactory = ComponentFactory;
        
        const grid = new Grid();
        grid.defaultWindowColSpan = 8;
        grid.defaultWindowRowSpan = 2;
        expect(grid.windowCount).toBe(0);
        expect(grid.dashboard).toBeFalsy();

        db.component = grid;
        expect(grid.dashboard).toBe(db);

        const w = new Window();
        w.path = "/woo";
        grid.add(w);
        expect(grid.windowCount).toBe(1);
        expect(w.parent).toBe(grid);

        const w2 = new Window();
        w.path = "/bar";
        grid.add(w2);
        expect(grid.windowCount).toBe(2);
        expect(w2.parent).toBe(grid);

        w2.close();

        expect(grid.windowCount).toBe(1);

        grid.add(w2);

        expect(grid.windowCount).toBe(2);
    });

    test("grid config set test", () => {
        const grid = new Grid();
        grid.componentFactory = ComponentFactory;
        grid.config = {
            type: "grid",
            cellMargin: 2,
            cellSize: 10,
            closeDisabled: true,
            defaultWindowColSpan: 4,
            defaultWindowRowSpan: 10,   
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

        expect(grid.windowCount).toBe(2);
        expect(grid.windows[0].path).toBe("/woo");
        expect(grid.windows[1].path).toBe("/bar");
        expect(grid.cellMargin).toBe(2);
        expect(grid.cellSize).toBe(10);
        expect(grid.rows).toBe(80);
        expect(grid.columns).toBe(60);
        expect(grid.defaultWindowColSpan).toBe(4);
        expect(grid.defaultWindowRowSpan).toBe(10);
        expect(grid.closeDisabled).toBeTruthy();
    });

    test("grid config observe test", () => {
        const grid = new Grid();
        grid.componentFactory = ComponentFactory;
        let config : any;
        autorun(() => {
            config = grid.config;
        });

        expect(config.type).toBe(ComponentTypes.grid);
        expect(config.windows.length).toBe(0);

        // add in a window
        const w = new Window();
        w.path = "/woo";

        grid.add(w);

        expect(config.windows.length).toBe(1);
        expect(config.windows[0].path).toBe(w.path);

        // adding a transient window shouldn't change the config
        const tw = new Window();
        tw.path = "/bar";
        tw.transient = true;

        grid.add(tw);

        expect(config.windows.length).toBe(1);
        expect(config.windows[0].path).toBe(w.path);

        // changing the window to non-transient
        tw.transient = false;

        expect(config.windows.length).toBe(2);
        expect(config.windows[0].path).toBe(w.path);
        expect(config.windows[1].path).toBe(tw.path);

        // update the size of the first window
        grid.resizeStart(w, WindowResizeType.right);
        grid.resizeTo(20, 20);
        grid.resizeEnd();
    });

    test("grid viewport test", () => {
        const db = new Dashboard();
        db.componentFactory = ComponentFactory;
        const grid = new Grid();
        
        const window = new Window();
        window.path = "/woo";
        grid.add(window);
        db.component = grid;
        db.setViewport(0, 0, 2048, 768);
        
        // stack dimensions should match dashboard
        expect(grid.width).toBe(db.width);
        expect(grid.height).toBe(db.height);

        expect(window.width).toBeGreaterThan(0);
        expect(window.height).toBeGreaterThan(0);

        expect(window.width).toBe(grid.getWindowViewportWidth(window));
        expect(window.height).toBe(grid.getWindowViewportHeight(window));

        // check the size of the viewport for the window
        /*
        expect(portal.x).toBe(grid.cellMargin);
        expect(portal.y).toBe(grid.cellMargin);
        expect(portal.width).toBe(window.width);
        expect(portal.height).toBe(window.height);
        */
        const newWindow = new Window();
        newWindow.path = "/bar";
        grid.add(newWindow);

        // first window should have the same bounds
        /*
        expect(portal.x).toBe(grid.cellMargin);
        expect(portal.y).toBe(grid.cellMargin);
        expect(portal.width).toBe(window.width);
        expect(portal.height).toBe(window.height);
        */

        // check out the new window setup
        expect(newWindow.width).toBeGreaterThan(0);
        expect(newWindow.height).toBeGreaterThan(0);
        
        /*
        expect(newPortal.x).toBe(portal.x + portal.width + grid.cellMargin);
        expect(newPortal.y).toBe(grid.cellMargin);
        expect(portal.width).toBe(newWindow.width);
        expect(portal.height).toBe(newWindow.height);
        */

        // remove window - ensure the portal is destroyed
        newWindow.close();
    });
});