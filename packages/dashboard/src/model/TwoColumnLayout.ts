import { IDashboard } from "./IDashboard";
import { action } from "mobx";
import { assignWindows, getColumnCount } from "./DashboardLayoutHelper";

const applyLayout = async (dashboard : IDashboard) => {
    let HSplit;
    let Stack;
    const splitImportPromise = import("./Split").then(m => HSplit = m.HSplit);
    const stackImportPrommise = import("./Stack").then(m => Stack = m.Stack);
    await Promise.all([splitImportPromise, stackImportPrommise]);
    action(() => {
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
    })();
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return getColumnCount(dashboard) === 2;
};

export { applyLayout, isLayoutApplied }