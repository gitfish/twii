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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var AppWrapper_1 = require("@twii/ui-core/lib/app/component/AppWrapper");
var DashboardList_1 = require("./DashboardList");
var DashboardListStore_1 = require("../DashboardListStore");
var DashboardListMenuButton_1 = require("./DashboardListMenuButton");
var DashboardListApplet = /** @class */ (function (_super) {
    __extends(DashboardListApplet, _super);
    function DashboardListApplet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardListApplet.prototype.componentWillMount = function () {
        DashboardListStore_1.DashboardListStore.load();
    };
    DashboardListApplet.prototype.componentDidMount = function () {
        this.props.host.setTitle("Dashboards");
    };
    DashboardListApplet.prototype.render = function () {
        var title = React.createElement(DashboardListMenuButton_1.DashboardListMenuButton, { dashboardList: DashboardListStore_1.DashboardListStore });
        var farItems = [
            { path: "/dashboard/layout" }
        ];
        return (React.createElement(AppWrapper_1.AppWrapper, { className: "dashboard-list-applet", title: title, farItems: farItems },
            React.createElement(DashboardList_1.DashboardListContainer, { dashboardList: DashboardListStore_1.DashboardListStore, host: this.props.host })));
    };
    return DashboardListApplet;
}(React.Component));
exports.default = DashboardListApplet;
exports.DashboardListApplet = DashboardListApplet;
//# sourceMappingURL=DashboardListApp.js.map