"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router_1 = require("roota/lib/Router");
var ComponentTypes_1 = require("./ComponentTypes");
var r = new Router_1.default();
exports.default = r;
exports.ComponentFactoryRouter = r;
r.use(ComponentTypes_1.window, function (req) {
    return Promise.resolve().then(function () { return require("./Window"); }).then(function (m) {
        return new m.Window();
    });
});
r.use(ComponentTypes_1.stack, function (req) {
    return Promise.resolve().then(function () { return require("./Stack"); }).then(function (m) {
        return new m.Stack();
    });
});
r.use(ComponentTypes_1.list, function (req) {
    return Promise.resolve().then(function () { return require("./List"); }).then(function (m) {
        return new m.List();
    });
});
r.use(ComponentTypes_1.vsplit, function (req) {
    return Promise.resolve().then(function () { return require("./Split"); }).then(function (m) {
        return new m.VSplit();
    });
});
r.use(ComponentTypes_1.hsplit, function (req) {
    return Promise.resolve().then(function () { return require("./Split"); }).then(function (m) {
        return new m.HSplit();
    });
});
//# sourceMappingURL=ComponentFactoryRouter.js.map