"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Router_1 = require("roota/lib/Router");
var Utils_1 = require("roota/lib/Utils");
var r = new Router_1.default();
exports.default = r;
exports.DashboardRouter = r;
r.use("/layout", Utils_1.exactPath(function (req) {
    return Promise.resolve().then(function () { return require("./component/DashboardLayoutButton"); }).then(function (m) {
        return React.createElement(m.DashboardListLayoutApplet, null);
    });
}));
//# sourceMappingURL=DashboardRouter.js.map