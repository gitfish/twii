import { IDashboard } from "./IDashboard";
import * as ComponentTypes from "./ComponentTypes";
import { Stack } from "./Stack";

const applyLayout = (dashboard : IDashboard) => {
    // grab windows
    const windows = dashboard.windows;
    // grab active window
    const active = windows.find(w => w.active);
    const stack = new Stack();
    dashboard.setComponent(stack);
    windows.forEach(w => {
        stack.add(w);
    });
    if(active) {
        stack.setActive(active);
    } else {
        stack.setActiveIndex(0);
    }
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return dashboard.component && dashboard.component.type === ComponentTypes.stack;
};

export { applyLayout, isLayoutApplied }
