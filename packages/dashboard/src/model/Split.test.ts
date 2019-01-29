import { Dashboard } from "./Dashboard";
import { HSplit, VSplit } from "./Split";
import { IWindow } from "./IWindow";
import { Window } from "./Window";
import * as ComponentTypes from "./ComponentTypes";
import { IStack } from "./IStack";
import { ComponentFactory } from "./ComponentFactory";

describe("Split Test", () => {
    test("hsplit basic test", () => {
        const db = new Dashboard();
        db.componentFactory = ComponentFactory;

        const hsplit = new HSplit();
        expect(hsplit.dashboard).toBeFalsy();
        expect(hsplit.left).toBeFalsy();
        expect(hsplit.right).toBeFalsy();

        const left = new Window();
        left.path = "/woo";

        const right = new Window();
        right.path = "/bar";

        hsplit.setLeft(left);
        hsplit.setRight(right);

        expect(hsplit.left).toBeTruthy();
        expect(hsplit.right).toBeTruthy();
        expect(hsplit.left).toBe(left);
        expect(hsplit.right).toBe(right);

        expect(left.parent).toBe(hsplit);
        expect(right.parent).toBe(hsplit);

        db.component = hsplit;

        expect(hsplit.dashboard).toBe(db);
        expect(left.dashboard).toBe(db);
        expect(right.dashboard).toBe(db);
    });

    test("hsplit config test", () => {
        const hsplit = new HSplit();
        hsplit.componentFactory = ComponentFactory;
        hsplit.config = {
            type: "hsplit",
            offset: 0.5,
            minItemWidth: 40,
            left: {
                component: {
                    type: "window",
                    path: "/woo"
                }
            },
            right: {
                component: {
                    type: "stack",
                    windows: [
                        {
                            type: "window",
                            path: "/bar"
                        },
                        {
                            type: "window",
                            path: "/chun"
                        }
                    ]
                }
            }
        };

        expect(hsplit.left.type).toBe(ComponentTypes.window);
        expect(hsplit.right.type).toBe(ComponentTypes.stack);

        const left = hsplit.left as IWindow;
        expect(left.path).toBe("/woo");

        const right = hsplit.right as IStack;
        expect(right.windowCount).toBe(2);
        expect(right.windows[0].path).toBe("/bar");
        expect(right.windows[1].path).toBe("/chun");

        expect(hsplit.minItemWidth).toBe(40);
    });

    test("hsplit viewport test", () => {
        const db = new Dashboard();
        db.componentFactory = ComponentFactory;

        const hsplit = new HSplit();
        hsplit.offset = 0.5;
        db.component = hsplit;

        db.setViewport(0, 0, 820, 600);

        expect(hsplit.width).toBe(db.width);
        expect(hsplit.height).toBe(db.height);
        expect(hsplit.leftWidth).toBe(410);
        expect(hsplit.rightWidth).toBe(hsplit.width - hsplit.leftWidth - hsplit.splitterWidth);

        const left = new Window();
        left.path = "/woo";

        const right = new Window();
        right.path = "/bar";

        hsplit.left = left;

        // check that the left component now has dimensions
        expect(left.height).toBe(hsplit.height);
        expect(left.width).toBe(hsplit.leftWidth);

        hsplit.right = right;

        // check that the right component now has dimensions
        expect(right.height).toBe(hsplit.height);
        expect(right.width).toBe(hsplit.rightWidth);

        // check the left and right portals
        /*
        expect(leftPortal.x).toBe(left.x);
        expect(leftPortal.y).toBe(left.y);
        expect(leftPortal.width).toBe(left.width);
        expect(leftPortal.height).toBe(left.height);
        */

        /*
        expect(rightPortal.x).toBe(right.x);
        expect(rightPortal.y).toBe(right.y);
        expect(rightPortal.width).toBe(right.width);
        expect(rightPortal.height).toBe(right.height);
        */
    });

    test("vsplit basic test", () => {
        const db = new Dashboard();
        db.componentFactory = ComponentFactory;

        const vsplit = new VSplit();
        expect(vsplit.dashboard).toBeFalsy();
        expect(vsplit.top).toBeFalsy();
        expect(vsplit.bottom).toBeFalsy();

        const top = new Window();
        top.path = "/woo";

        const bottom = new Window();
        bottom.path = "/bar";

        vsplit.top = top;
        vsplit.bottom = bottom;

        expect(vsplit.top).toBeTruthy();
        expect(vsplit.bottom).toBeTruthy();
        expect(vsplit.top).toBe(top);
        expect(vsplit.bottom).toBe(bottom);

        expect(top.parent).toBe(vsplit);
        expect(bottom.parent).toBe(vsplit);

        db.component = vsplit;

        expect(vsplit.dashboard).toBe(db);
        expect(top.dashboard).toBe(db);
        expect(bottom.dashboard).toBe(db);
    });

    test("vsplit config test", () => {
        const vsplit = new VSplit();
        vsplit.componentFactory = ComponentFactory;
        vsplit.config = {
            type: "vsplit",
            offset: 0.5,
            minItemHeight: 55,
            top: {
                component: {
                    type: "window",
                    path: "/woo"
                }
            },
            bottom: {
                component: {
                    type: "stack",
                    windows: [
                        {
                            type: "window",
                            path: "/bar"
                        },
                        {
                            type: "window",
                            path: "/chun"
                        }
                    ]
                }
            }
        };

        expect(vsplit.top.type).toBe(ComponentTypes.window);
        expect(vsplit.bottom.type).toBe(ComponentTypes.stack);

        const top = vsplit.top as IWindow;
        expect(top.path).toBe("/woo");

        const bottom = vsplit.bottom as IStack;
        expect(bottom.windowCount).toBe(2);
        expect(bottom.windows[0].path).toBe("/bar");
        expect(bottom.windows[1].path).toBe("/chun");

        expect(vsplit.minItemHeight).toBe(55);
    });

    test("vsplit viewport test", () => {
        const db = new Dashboard();

        const vsplit = new VSplit();
        vsplit.offset = 0.5;
        db.component = vsplit;

        db.setViewport(0, 0, 820, 600);

        expect(vsplit.width).toBe(db.width);
        expect(vsplit.height).toBe(db.height);
        expect(vsplit.topHeight).toBe(300);
        expect(vsplit.bottomHeight).toBe(vsplit.height - vsplit.topHeight - vsplit.splitterHeight);

        const top = new Window();
        top.path = "/woo";

        const bottom = new Window();
        bottom.path = "/bar";

        vsplit.top = top;

        // check that the left component now has dimensions
        expect(top.width).toBe(vsplit.width);
        expect(top.height).toBe(vsplit.topHeight);

        vsplit.bottom = bottom;

        // check that the right component now has dimensions
        expect(bottom.width).toBe(vsplit.width);
        expect(bottom.height).toBe(vsplit.bottomHeight);

        // check the left and right portals
        /*
        expect(topPortal.x).toBe(top.x);
        expect(topPortal.y).toBe(top.y);
        expect(topPortal.width).toBe(top.width);
        expect(topPortal.height).toBe(top.height);
        */

        /*
        expect(bottomPortal.x).toBe(bottom.x);
        expect(bottomPortal.y).toBe(bottom.y);
        expect(bottomPortal.width).toBe(bottom.width);
        expect(bottomPortal.height).toBe(bottom.height);
        */
    });
});