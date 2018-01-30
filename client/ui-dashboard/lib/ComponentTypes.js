"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dashboard = "dashboard";
exports.dashboard = dashboard;
var dashboardList = "dashboardList";
exports.dashboardList = dashboardList;
var stack = "stack";
exports.stack = stack;
var list = "list";
exports.list = list;
var hsplit = "hsplit";
exports.hsplit = hsplit;
var vsplit = "vsplit";
exports.vsplit = vsplit;
var win = "window";
exports.window = win;
var isSplit = function (comp) {
    return comp && (comp.type === hsplit || comp.type === vsplit);
};
exports.isSplit = isSplit;
//# sourceMappingURL=ComponentTypes.js.map