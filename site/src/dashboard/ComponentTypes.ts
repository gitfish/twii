import IComponent from "./IComponent";

const dashboard = "dashboard";
const dashboardList = "dashboardList";
const stack = "stack";
const list = "list";
const hsplit = "hsplit";
const vsplit = "vsplit";
const win = "window";


const isSplit = (comp : IComponent) => {
    return comp && (comp.type === hsplit || comp.type === vsplit);
};

export { dashboard, dashboardList, stack, list, hsplit, vsplit, win as window, isSplit }
