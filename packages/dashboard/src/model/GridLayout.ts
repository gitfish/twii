import { IDashboard } from "./IDashboard";
import { action } from "mobx";
import * as ComponentTypes from "./ComponentTypes";

const applyLayout = async (dashboard : IDashboard) => {
    const Grid = (await import("./Grid")).Grid;
    action(() => {
        const windows = dashboard.windows;
        const grid = new Grid();
        dashboard.setComponent(grid);
        windows.forEach(w => grid.add(w));
    })();
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return dashboard.component && dashboard.component.type === ComponentTypes.grid;
};

export { applyLayout, isLayoutApplied }