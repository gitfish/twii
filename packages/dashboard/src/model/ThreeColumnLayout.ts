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
    })();
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return getColumnCount(dashboard) === 3;
};

export { applyLayout, isLayoutApplied }