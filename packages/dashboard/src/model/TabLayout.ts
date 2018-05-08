import { IDashboard } from "./IDashboard";
import { action } from "mobx";
import * as ComponentTypes from "./ComponentTypes";

const applyLayout =  async (dashboard : IDashboard) => {
    const Stack = (await import("./Stack")).Stack;
    action(() => {
        // grab windows
        const windows = dashboard.windows;
        // grab active window
        const active = windows.find(w => w.active);
        const stack = new Stack();
        dashboard.setComponent(stack);
        windows.forEach(w => {
            stack.add(w, false);
        });
        if(active) {
            stack.setActive(active);
        } else {
            stack.setActiveIndex(0);
        }
    })();
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return dashboard.component && dashboard.component.type === ComponentTypes.stack;
};

export { applyLayout, isLayoutApplied }
