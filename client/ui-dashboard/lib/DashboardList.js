"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var Component_1 = require("./Component");
var Dashboard_1 = require("./Dashboard");
var Stack_1 = require("./Stack");
var SyncModel_1 = require("@twii/core/lib/common/model/SyncModel");
var ComponentTypes = require("./ComponentTypes");
var DashboardList = /** @class */ (function (_super) {
    __extends(DashboardList, _super);
    function DashboardList() {
        var _this = _super.call(this) || this;
        _this.sync = new SyncModel_1.SyncModel();
        _this._activeIndex = -1;
        _this.dashboards = [];
        _this._closeDisabled = false;
        _this._createDefaultDashboard = true;
        _this._saveDelay = 1000;
        _this._onResize = function () {
            _this.dashboards.forEach(function (db) { return db.emit({ type: "resize" }); });
        };
        _this._saveConfig = function (config) {
            _this.saver(config);
        };
        _this._loadDone = function (config) {
            return _this.setConfig(config).then(function () {
                if (_this.saver) {
                    _this._configSaveDisposer = mobx_1.reaction(function () {
                        return _this.config;
                    }, _this._saveConfig, { delay: _this.saveDelay });
                }
                if (_this.dashboardCount === 0) {
                    _this.addDefaultDashboard();
                }
            });
        };
        _this._loadError = function (error) {
            console.error(error);
            return _this.setConfig(undefined).then(function () {
                _this.sync.syncError(error);
            });
        };
        _this.addEventListener("resize", _this._onResize);
        return _this;
    }
    Object.defineProperty(DashboardList.prototype, "type", {
        get: function () {
            return ComponentTypes.dashboardList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardList.prototype, "createDefaultDashboard", {
        get: function () {
            return this._createDefaultDashboard;
        },
        set: function (value) {
            this.setCreateDefaultDashboard(value);
        },
        enumerable: true,
        configurable: true
    });
    DashboardList.prototype.setCreateDefaultDashboard = function (createDefaultDashboard) {
        this._createDefaultDashboard = createDefaultDashboard;
    };
    Object.defineProperty(DashboardList.prototype, "dashboardCount", {
        get: function () {
            return this.dashboards ? this.dashboards.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardList.prototype, "closeDisabled", {
        get: function () {
            return this._closeDisabled;
        },
        set: function (value) {
            this.setCloseDisabled(value);
        },
        enumerable: true,
        configurable: true
    });
    DashboardList.prototype.setCloseDisabled = function (closeDisabled) {
        this._closeDisabled = closeDisabled;
    };
    Object.defineProperty(DashboardList.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex || 0;
        },
        set: function (value) {
            this.setActiveIndex(value);
        },
        enumerable: true,
        configurable: true
    });
    DashboardList.prototype.setActiveIndex = function (value) {
        if (value !== this._activeIndex) {
            this._activeIndex = value;
        }
    };
    Object.defineProperty(DashboardList.prototype, "active", {
        get: function () {
            return this.activeIndex >= 0 && this.activeIndex < this.dashboards.length ? this.dashboards[this.activeIndex] : undefined;
        },
        set: function (value) {
            this.setActive(value);
        },
        enumerable: true,
        configurable: true
    });
    DashboardList.prototype.setActive = function (value) {
        this.activeIndex = this.dashboards.indexOf(value);
    };
    Object.defineProperty(DashboardList.prototype, "config", {
        get: function () {
            return {
                type: this.type,
                activeIndex: this.activeIndex,
                dashboards: this.dashboards.map(function (d) { return d.config; }),
                closeDisabled: this._closeDisabled
            };
        },
        enumerable: true,
        configurable: true
    });
    DashboardList.prototype.setConfig = function (value) {
        var _this = this;
        this.dashboards = [];
        var dashboardPromise;
        if (value && value.dashboards && value.dashboards.length > 0) {
            dashboardPromise = Promise.all(value.dashboards.map(function (dc) {
                var db = new Dashboard_1.Dashboard();
                _this.add(db);
                return db.setConfig(dc);
            }));
        }
        else {
            dashboardPromise = Promise.resolve();
        }
        return dashboardPromise.then(mobx_1.action(function () {
            _this.setActiveIndex(value && !isNaN(value.activeIndex) ? value.activeIndex : -1);
            _this.setCloseDisabled(value ? value.removeItemsDisabled : undefined);
            _this.sync.syncEnd();
        }));
    };
    DashboardList.prototype.add = function (dashboard, makeActive) {
        if (makeActive === void 0) { makeActive = true; }
        if (dashboard.parent !== this) {
            dashboard.removeFromParent();
            dashboard.parent = this;
            this.dashboards.push(dashboard);
            if (!dashboard.component && this.addApplet) {
                var s = new Stack_1.Stack();
                dashboard.setComponent(s);
                s.addNew();
            }
            if (makeActive) {
                this.active = dashboard;
            }
        }
    };
    DashboardList.prototype.addDefaultDashboard = function () {
        if (this.dashboardCount === 0 && this.createDefaultDashboard && this.addApplet) {
            var newDashboard = new Dashboard_1.Dashboard();
            newDashboard.setTitle("Dashboard 1");
            this.add(newDashboard, true);
        }
    };
    DashboardList.prototype.remove = function (node) {
        var idx = this.dashboards.indexOf(node);
        if (idx >= 0) {
            var dashboard = this.dashboards[idx];
            dashboard.parent = undefined;
            this.dashboards.splice(idx, 1);
            if (this.activeIndex >= this.dashboards.length) {
                this.setActiveIndex(this.dashboards.length - 1);
            }
            dashboard.unmount();
            if (this.dashboardCount === 0) {
                this.addDefaultDashboard();
            }
        }
    };
    Object.defineProperty(DashboardList.prototype, "saveDelay", {
        get: function () {
            return this._saveDelay;
        },
        set: function (value) {
            if (!isNaN(value) && value >= 0) {
                this._saveDelay = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    DashboardList.prototype.load = function () {
        if (this._configSaveDisposer) {
            this._configSaveDisposer();
            delete this._configSaveDisposer;
        }
        if (this.loader) {
            this.sync.syncStart();
            return this.loader().then(this._loadDone).catch(this._loadError);
        }
        return Promise.reject({ code: "ILLEGAL_STATE", message: "A loader has not been configured" });
    };
    DashboardList.prototype._findFirstChild = function (predicate) {
        var r;
        this.dashboards.some(function (d) {
            r = d.findFirst(predicate);
            return r ? true : false;
        });
        return r;
    };
    DashboardList.prototype._findAllChildren = function (predicate) {
        var r = [];
        var dr;
        this.dashboards.forEach(function (d) {
            dr = d.findAll(predicate);
            if (dr && dr.length > 0) {
                r = r.concat(dr);
            }
        });
        return r;
    };
    DashboardList.prototype.unmount = function () {
        this.dashboards.forEach(function (db) { return db.unmount(); });
    };
    DashboardList.prototype.clear = function () {
        this.unmount();
        this.dashboards = [];
        this.setActiveIndex(-1);
        this.addDefaultDashboard();
    };
    __decorate([
        mobx_1.observable
    ], DashboardList.prototype, "sync", void 0);
    __decorate([
        mobx_1.observable
    ], DashboardList.prototype, "_activeIndex", void 0);
    __decorate([
        mobx_1.observable
    ], DashboardList.prototype, "dashboards", void 0);
    __decorate([
        mobx_1.observable
    ], DashboardList.prototype, "_closeDisabled", void 0);
    __decorate([
        mobx_1.observable
    ], DashboardList.prototype, "_createDefaultDashboard", void 0);
    __decorate([
        mobx_1.computed
    ], DashboardList.prototype, "createDefaultDashboard", null);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "setCreateDefaultDashboard", null);
    __decorate([
        mobx_1.computed
    ], DashboardList.prototype, "dashboardCount", null);
    __decorate([
        mobx_1.computed
    ], DashboardList.prototype, "closeDisabled", null);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "setCloseDisabled", null);
    __decorate([
        mobx_1.computed
    ], DashboardList.prototype, "activeIndex", null);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "setActiveIndex", null);
    __decorate([
        mobx_1.computed
    ], DashboardList.prototype, "active", null);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "setActive", null);
    __decorate([
        mobx_1.computed
    ], DashboardList.prototype, "config", null);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "setConfig", null);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "add", null);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "_loadDone", void 0);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "_loadError", void 0);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "load", null);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "unmount", null);
    __decorate([
        mobx_1.action
    ], DashboardList.prototype, "clear", null);
    return DashboardList;
}(Component_1.Component));
exports.DashboardList = DashboardList;
//# sourceMappingURL=DashboardList.js.map