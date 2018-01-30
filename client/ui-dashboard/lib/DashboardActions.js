"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var DashboardAddStore_1 = require("./DashboardAddStore");
var DashboardRemoveStore_1 = require("./DashboardRemoveStore");
var addDashboard = mobx_1.action(function (opts) {
    DashboardAddStore_1.DashboardAddStore.init(opts);
});
exports.addDashboard = addDashboard;
var removeDashboard = mobx_1.action(function (opts) {
    DashboardRemoveStore_1.DashboardRemoveStore.init(opts);
});
exports.removeDashboard = removeDashboard;
//# sourceMappingURL=DashboardActions.js.map