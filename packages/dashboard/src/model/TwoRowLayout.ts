import { IDashboard } from "./IDashboard";
import { assignWindows, getColumnCount } from "./DashboardLayoutHelper";
import { VSplit } from "./Split";
import { Stack } from "./Stack";

const applyLayout = (dashboard : IDashboard) => {
    const windows = dashboard.windows;
    // create the new containers
    const stacks = [
        new Stack(),
        new Stack()
    ];
    const split = new VSplit();
    split.setTop(stacks[0]);
    split.setBottom(stacks[1]);
    dashboard.setComponent(split);
    assignWindows(windows, stacks);
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return getColumnCount(dashboard) === 2;
};

export { applyLayout, isLayoutApplied }