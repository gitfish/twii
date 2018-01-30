"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DashboardList_1 = require("./DashboardList");
var DashboardStorageServiceContext_1 = require("./DashboardStorageServiceContext");
var storageKey = "analyst-desktop-dashboard-list";
var DashboardListStore = new DashboardList_1.DashboardList();
exports.default = DashboardListStore;
exports.DashboardListStore = DashboardListStore;
DashboardListStore.loader = function () {
    return DashboardStorageServiceContext_1.DashboardStorageServiceContext.value.getItem(storageKey);
};
DashboardListStore.saver = function (data) {
    return DashboardStorageServiceContext_1.DashboardStorageServiceContext.value.setItem(storageKey, data);
};
DashboardListStore.addApplet = { title: "Add Widget", path: "/listing/bookmarks" };
//# sourceMappingURL=DashboardListStore.js.map