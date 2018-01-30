"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Stack_1 = require("./Stack");
var Split_1 = require("./Split");
var WindowPortal_1 = require("./WindowPortal");
var List_1 = require("./List");
var StackComponentFactory = function (comp) {
    return React.createElement(Stack_1.Stack, { stack: comp });
};
var HSplitComponentFactory = function (comp) {
    return React.createElement(Split_1.HSplit, { hsplit: comp });
};
var VSplitComponentFactory = function (comp) {
    return React.createElement(Split_1.VSplit, { vsplit: comp });
};
var WindowComponentFactory = function (comp) {
    return React.createElement(WindowPortal_1.ProjectedWindowPortal, { window: comp });
};
var ListComponentFactory = function (comp) {
    return React.createElement(List_1.List, { stack: comp });
};
var ComponentFactoryMap = {
    stack: StackComponentFactory,
    hsplit: HSplitComponentFactory,
    vsplit: VSplitComponentFactory,
    window: WindowComponentFactory,
    list: ListComponentFactory
};
var ComponentFactory = function (comp) {
    if (comp) {
        var f = ComponentFactoryMap[comp.type];
        if (f) {
            return f(comp);
        }
    }
    return null;
};
exports.default = ComponentFactory;
exports.ComponentFactory = ComponentFactory;
//# sourceMappingURL=ComponentFactory.js.map