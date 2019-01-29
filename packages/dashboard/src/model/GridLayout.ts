import { IDashboard } from "./IDashboard";
import * as ComponentTypes from "./ComponentTypes";
import { Grid } from "./Grid";

const applyLayout = (dashboard : IDashboard) => {
    const windows = dashboard.windows;
    const grid = new Grid();
    dashboard.setComponent(grid);
    windows.forEach(w => grid.add(w));
};

const isLayoutApplied = (dashboard : IDashboard) => {
    return dashboard.component && dashboard.component.type === ComponentTypes.grid;
};

export { applyLayout, isLayoutApplied }