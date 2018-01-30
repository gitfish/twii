"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentGlobals_1 = require("./ComponentGlobals");
var removeAllChildren = function (node) {
    var r = [];
    while (node.childNodes.length > 0) {
        r.push(node.removeChild(node.childNodes.item(0)));
    }
    return r;
};
exports.removeAllChildren = removeAllChildren;
var shrinkChildren = function (node, count) {
    while (node.childNodes.length > count) {
        node.removeChild(node.childNodes.item(node.childNodes.length - 1));
    }
};
exports.shrinkChildren = shrinkChildren;
var setSingleChild = function (node, content) {
    if (node.childNodes.length === 0) {
        node.appendChild(content);
    }
    else if (node.childNodes.item(0) !== content) {
        node.replaceChild(content, node.childNodes.item(0));
    }
};
exports.setSingleChild = setSingleChild;
var dispatchWindowResizeImmediate = function () {
    ComponentGlobals_1.ComponentGlobals.ignoreResize = true;
    try {
        var event = document.createEvent("Event");
        event.initEvent("resize", true, true);
        window.dispatchEvent(event);
    }
    finally {
        ComponentGlobals_1.ComponentGlobals.ignoreResize = false;
    }
};
var dispatchWindowResize = function () {
    // may need to debounce this in the future
    dispatchWindowResizeImmediate();
};
exports.dispatchWindowResize = dispatchWindowResize;
//# sourceMappingURL=DOMHelper.js.map