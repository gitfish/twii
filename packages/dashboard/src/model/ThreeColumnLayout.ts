import { IDashboard } from "./IDashboard";
import { assignWindows, getColumnCount } from "./DashboardLayoutHelper";
import { HSplit } from "./Split";
import { Stack } from "./Stack";

const applyLayout = (dashboard : IDashboard) => {
    const windows = dashboard.windows;
    const stacks = [
        new Stack(),
        new Stack(),
        new Stack()
    ];
    const outerSplit = new HSplit();
    outerSplit.setOffset(0.33);
    const innerSplit = new HSplit();
    outerSplit.setLeft(stacks[0]);
    outerSplit.setRight(innerSplit);
    innerSplit.setLeft(stacks[1]);
    innerSplit.setRight(stacks[2]);
    dashboard.setComponent(outerSplit);
    assignWindows(windows, stacks);
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return getColumnCount(dashboard) === 3;
};

export { applyLayout, isLayoutApplied }