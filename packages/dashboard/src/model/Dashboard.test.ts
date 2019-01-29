import { autorun } from "mobx";
import { Dashboard } from "./Dashboard";
import { Stack } from "./Stack";
import { IWindow } from "./IWindow";
import { Window } from "./Window";
import * as ComponentTypes from "./ComponentTypes";
import { ComponentFactory } from "./ComponentFactory";
import { IHSplit, IVSplit } from "./ISplit";
import { IStack } from "./IStack";
import { HSplit } from "./Split";

describe("Dashboard Test", () => {
    test("dashboard basic test", () => {
        const db = new Dashboard();
        db.componentFactory = ComponentFactory;
        
        const stack = new Stack();
        expect(stack.windowCount).toBe(0);
        expect(stack.dashboard).toBeFalsy();
    });

    test("dashboard config set test", () => {
        const dashboard = new Dashboard();
        dashboard.componentFactory = ComponentFactory;
        dashboard.config = {
            type: "dashboard",
            title: "Sample Dashboard",
            closeDisabled: false,
            component: {
                type: "hsplit",
                left: {
                    component: {
                        type: "stack",
                        activeIndex: 1,
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
                    }
                },
                right: {
                    component: {
                        type: "vsplit",
                        top: {
                            component: {
                                type: "stack",
                                activeIndex: 0,
                                windows: [
                                    {
                                        type: "window",
                                        path: "/sea"
                                    }
                                ]
                            }
                        },
                        bottom: {
                            component: {
                                type: "window",
                                path: "/land"
                            }
                        }
                    }
                }
            }
        };

        expect(dashboard.component.type).toBe("hsplit");
        const hsplit = dashboard.component as IHSplit;
        expect(hsplit.left.type).toBe("stack");
        const hl = hsplit.left as IStack;
        expect(hl.activeIndex).toBe(1);
        expect(hl.windowCount).toBe(2);
        expect(hl.windows[0].path).toBe("/woo");
        expect(hl.windows[1].path).toBe("/bar");
        expect(hsplit.right.type).toBe("vsplit");
        const hr = hsplit.right as IVSplit;
        expect(hr.top.type).toBe("stack");
        const hrt = hr.top as IStack;
        expect(hrt.windowCount).toBe(1);
        expect(hrt.activeIndex).toBe(0);
        expect(hrt.windows[0].path).toBe("/sea");
        expect(hr.bottom.type).toBe("window");
        const hrr = hr.bottom as IWindow;
        expect(hrr.path).toBe("/land");
    });

    test("dashboard config observe test", () => {
        const dashboard = new Dashboard();
        dashboard.componentFactory = ComponentFactory;
        let config : any;
        autorun(() => {
            config = dashboard.config;
        });

        expect(config.type).toBe(ComponentTypes.dashboard);
        expect(config.component).toBeFalsy();

        const stack = new Stack();
        dashboard.component = stack;

        expect(config.component.type).toBe("stack");
        expect(config.component.windows.length).toBe(0);

        const window = new Window();
        window.path = "/woo";
        stack.add(window);

        expect(config.component.windows.length).toBe(1);
        expect(config.component.windows[0].path).toBe("/woo");

        // change the component to hsplit
        const hsplit = new HSplit();
        dashboard.component = hsplit;

        expect(config.component.type).toBe("hsplit");
        const leftWindow = new Window();
        leftWindow.path = "/foo";
        hsplit.left = leftWindow;

        expect(config.component.left).toBeTruthy();
        expect(config.component.left.component.type).toBe("window");
        expect(config.component.left.component.path).toBe("/foo");

        const rightStack = new Stack();
        hsplit.right = rightStack;

        expect(config.component.right).toBeTruthy();
        expect(config.component.right.component.type).toBe("stack");
        expect(config.component.right.component.windows.length).toBe(0);
    });

    test("dashboard viewport test", () => {
        const db = new Dashboard();
        db.componentFactory = ComponentFactory;
        const window = new Window();
        db.component = window;
        db.setViewport(0, 0, 600, 400);
        
        expect(window.x).toBe(0);
        expect(window.y).toBe(0);
        expect(window.width).toBe(600);
        expect(window.height).toBe(400);
    });
});