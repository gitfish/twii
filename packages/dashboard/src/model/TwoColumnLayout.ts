import { IDashboard } from "./IDashboard";
import { assignWindows, getColumnCount } from "./DashboardLayoutHelper";
import { HSplit } from "./Split";
import { Stack } from "./Stack";

const applyLayout = (dashboard : IDashboard) => {
    const windows = dashboard.windows;
    // create the new containers
    const stacks = [
        new Stack(),
        new Stack()
    ];
    const split = new HSplit();
    split.setLeft(stacks[0]);
    split.setRight(stacks[1]);
    dashboard.setComponent(split);
    assignWindows(windows, stacks);
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return getColumnCount(dashboard) === 2;
};

export { applyLayout, isLayoutApplied }