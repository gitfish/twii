"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var Dashboard_1 = require("./Dashboard");
var StringUtils_1 = require("@twii/core/lib/common/StringUtils");
var DashboardAddModel = /** @class */ (function () {
    function DashboardAddModel() {
        this.active = false;
        this.makeActive = true;
    }
    DashboardAddModel.prototype.init = function (opts) {
        this.dashboardList = opts.dashboardList;
        this.dashboard = new Dashboard_1.Dashboard();
        this.existing = opts.existing;
        var dashboardNumber = 1;
        var suggestedTitle;
        while (true) {
            suggestedTitle = "Dashboard " + dashboardNumber;
            if (!this.dashboardList.dashboards.some(function (db) { return db.title === suggestedTitle; })) {
                break;
            }
            else {
                dashboardNumber++;
            }
        }
        this.dashboard.setTitle(suggestedTitle);
        this.active = true;
    };
    DashboardAddModel.prototype.setExisting = function (existing) {
        this.existing = existing;
    };
    DashboardAddModel.prototype.setMakeActive = function (makeActive) {
        this.makeActive = makeActive;
    };
    DashboardAddModel.prototype._close = function () {
        this.existing = undefined;
        this.dashboardList = undefined;
        this.active = false;
    };
    Object.defineProperty(DashboardAddModel.prototype, "saveEnabled", {
        get: function () {
            return StringUtils_1.isNotBlank(this.dashboard.title) ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    DashboardAddModel.prototype.save = function () {
        if (this.existing) {
            this.dashboard.setComponentConfig(this.existing.componentConfig);
        }
        this.dashboardList.add(this.dashboard, this.makeActive);
        this._close();
    };
    DashboardAddModel.prototype.cancel = function () {
        this._close();
    };
    __decorate([
        mobx_1.observable
    ], DashboardAddModel.prototype, "active", void 0);
    __decorate([
        mobx_1.observable
    ], DashboardAddModel.prototype, "dashboardList", void 0);
    __decorate([
        mobx_1.observable
    ], DashboardAddModel.prototype, "existing", void 0);
    __decorate([
        mobx_1.observable
    ], DashboardAddModel.prototype, "dashboard", void 0);
    __decorate([
        mobx_1.observable
    ], DashboardAddModel.prototype, "makeActive", void 0);
    __decorate([
        mobx_1.action
    ], DashboardAddModel.prototype, "init", null);
    __decorate([
        mobx_1.action
    ], DashboardAddModel.prototype, "setExisting", null);
    __decorate([
        mobx_1.action
    ], DashboardAddModel.prototype, "setMakeActive", null);
    __decorate([
        mobx_1.action
    ], DashboardAddModel.prototype, "_close", null);
    __decorate([
        mobx_1.computed
    ], DashboardAddModel.prototype, "saveEnabled", null);
    __decorate([
        mobx_1.action
    ], DashboardAddModel.prototype, "save", null);
    __decorate([
        mobx_1.action
    ], DashboardAddModel.prototype, "cancel", null);
    return DashboardAddModel;
}());
exports.default = DashboardAddModel;
exports.DashboardAddModel = DashboardAddModel;
//# sourceMappingURL=DashboardAddModel.js.map