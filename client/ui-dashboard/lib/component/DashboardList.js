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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var Dashboard_1 = require("./Dashboard");
var Sync_1 = require("@twii/ui-core/lib/common/component/Sync");
var DashboardAdd_1 = require("./DashboardAdd");
var DashboardAddStore_1 = require("../DashboardAddStore");
var DashboardRemove_1 = require("./DashboardRemove");
var DashboardRemoveStore_1 = require("../DashboardRemoveStore");
var DashboardList = /** @class */ (function (_super) {
    __extends(DashboardList, _super);
    function DashboardList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardList.prototype.componentWillUnmount = function () {
        this.props.dashboardList.unmount();
    };
    DashboardList.prototype.render = function () {
        var _this = this;
        var active = this.props.dashboardList.active;
        var dashboards = this.props.dashboardList.dashboards.map(function (db) {
            return React.createElement(Dashboard_1.Dashboard, { key: db.id, hidden: db !== active, dashboard: db, host: _this.props.host });
        });
        return (React.createElement("div", { className: "dashboard-list" },
            React.createElement(DashboardAdd_1.DashboardAddPanel, { add: DashboardAddStore_1.DashboardAddStore }),
            React.createElement(DashboardRemove_1.DashboardRemoveDialog, { remove: DashboardRemoveStore_1.DashboardRemoveStore }),
            dashboards));
    };
    DashboardList = __decorate([
        mobx_react_1.observer
    ], DashboardList);
    return DashboardList;
}(React.Component));
exports.DashboardList = DashboardList;
var DashboardListContainer = /** @class */ (function (_super) {
    __extends(DashboardListContainer, _super);
    function DashboardListContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onRenderDone = function () {
            return React.createElement(DashboardList, __assign({}, _this.props));
        };
        return _this;
    }
    DashboardListContainer.prototype.render = function () {
        return React.createElement(Sync_1.Sync, { sync: this.props.dashboardList.sync, syncLabel: "Loading Dashboards...", onRenderDone: this._onRenderDone });
    };
    return DashboardListContainer;
}(React.Component));
exports.DashboardListContainer = DashboardListContainer;
//# sourceMappingURL=DashboardList.js.map