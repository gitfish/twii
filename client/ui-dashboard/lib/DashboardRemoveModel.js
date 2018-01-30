"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var DashboardRemoveModel = /** @class */ (function () {
    function DashboardRemoveModel() {
        this.active = false;
    }
    DashboardRemoveModel.prototype.init = function (opts) {
        this.dashboardList = opts.dashboardList;
        this.dashboard = opts.dashboard;
        this.active = true;
    };
    DashboardRemoveModel.prototype._close = function () {
        //this.dashboardList = undefined;
        //this.dashboard = undefined;
        this.active = false;
    };
    DashboardRemoveModel.prototype.save = function () {
        if (this.dashboard) {
            this.dashboardList.remove(this.dashboard);
        }
        else {
            this.dashboardList.clear();
        }
        this._close();
    };
    DashboardRemoveModel.prototype.cancel = function () {
        this._close();
    };
    __decorate([
        mobx_1.observable
    ], DashboardRemoveModel.prototype, "active", void 0);
    __decorate([
        mobx_1.observable
    ], DashboardRemoveModel.prototype, "dashboardList", void 0);
    __decorate([
        mobx_1.observable
    ], DashboardRemoveModel.prototype, "dashboard", void 0);
    __decorate([
        mobx_1.action
    ], DashboardRemoveModel.prototype, "init", null);
    __decorate([
        mobx_1.action
    ], DashboardRemoveModel.prototype, "_close", null);
    __decorate([
        mobx_1.action
    ], DashboardRemoveModel.prototype, "save", null);
    __decorate([
        mobx_1.action
    ], DashboardRemoveModel.prototype, "cancel", null);
    return DashboardRemoveModel;
}());
exports.default = DashboardRemoveModel;
exports.DashboardRemoveModel = DashboardRemoveModel;
//# sourceMappingURL=DashboardRemoveModel.js.map