import { IComponent } from "./IComponent";

const dashboard = "dashboard";
const dashboardList = "dashboardList";
const stack = "stack";
const grid = "grid";
const hsplit = "hsplit";
const vsplit = "vsplit";
const win = "window";
const basic = "basic";

const isSplit = (comp : IComponent) => {
    return comp && (comp.type === hsplit || comp.type === vsplit);
};

export {
    dashboard, 
    dashboardList,
    stack,
    grid,
    hsplit,
    vsplit,
    basic,
    win as window,
    isSplit
}
