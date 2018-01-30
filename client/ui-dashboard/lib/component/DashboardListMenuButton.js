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
var DashboardListStore_1 = require("../DashboardListStore");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
var DashboardActions_1 = require("../DashboardActions");
var Sync_1 = require("@twii/ui-core/lib/common/component/Sync");
var DashboardListMenuButton = /** @class */ (function (_super) {
    __extends(DashboardListMenuButton, _super);
    function DashboardListMenuButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onAddDashboardClick = function () {
            DashboardActions_1.addDashboard({ dashboardList: _this.props.dashboardList });
        };
        _this._onDashboardClick = function (e, item) {
            _this.props.dashboardList.setActive(item.dashboard);
        };
        _this._onRemoveAllDashboardsClick = function () {
            DashboardActions_1.removeDashboard({ dashboardList: _this.props.dashboardList });
        };
        _this._onClickCopyItem = function (e, item) {
            DashboardActions_1.addDashboard({ dashboardList: _this.props.dashboardList, existing: item.dashboard });
        };
        _this._onClickRemoveItem = function (e, item) {
            DashboardActions_1.removeDashboard({ dashboardList: _this.props.dashboardList, dashboard: item.dashboard });
        };
        return _this;
    }
    DashboardListMenuButton.prototype.render = function () {
        var _this = this;
        var title;
        var items = [];
        var sync = this.props.dashboardList.sync;
        var dashboards = this.props.dashboardList.dashboards;
        var active = this.props.dashboardList.active;
        if (dashboards.length > 0) {
            var dashboardItems = dashboards.map(function (d) {
                return {
                    key: d.id,
                    name: d.title,
                    canCheck: true,
                    checked: d === active,
                    dashboard: d,
                    onClick: _this._onDashboardClick,
                    split: true,
                    subMenuProps: {
                        items: [
                            {
                                key: "copy",
                                name: "Copy",
                                iconProps: { iconName: "Copy" },
                                dashboard: d,
                                onClick: _this._onClickCopyItem
                            },
                            {
                                key: "remove",
                                name: "Remove",
                                iconProps: { iconName: "ChromeClose" },
                                dashboard: d,
                                onClick: _this._onClickRemoveItem
                            }
                        ]
                    }
                };
            });
            var dashboardSectionItem = {
                key: "dashboardSectionItem",
                itemType: ContextualMenu_1.ContextualMenuItemType.Section,
                sectionProps: {
                    key: "dashboardSection",
                    title: "Dashboards",
                    items: dashboardItems
                }
            };
            items.push(dashboardSectionItem);
        }
        if (active) {
            title = active.title;
        }
        else {
            title = "Dashboards";
        }
        var actionItems = [];
        actionItems.push({
            key: "add",
            name: "Add Dashboard",
            onClick: this._onAddDashboardClick,
            iconProps: { iconName: "Add" }
        });
        if (this.props.dashboardList.dashboards.length > 0) {
            actionItems.push({
                key: "removeAllSep",
                name: "-"
            });
            actionItems.push({
                key: "removeAll",
                name: "Remove All Dashboards",
                onClick: this._onRemoveAllDashboardsClick,
                iconProps: { iconName: "Clear" }
            });
        }
        var actionSectionItem = {
            key: "actionSectionItem",
            itemType: ContextualMenu_1.ContextualMenuItemType.Section,
            sectionProps: {
                key: "actionSection",
                title: "Actions",
                items: actionItems,
                topDivider: true
            }
        };
        items.push(actionSectionItem);
        var menuProps = {
            items: items
        };
        return (React.createElement(Button_1.DefaultButton, { className: "dashboard-list-menu-button app-menu-button", menuProps: menuProps }, title));
    };
    DashboardListMenuButton = __decorate([
        mobx_react_1.observer
    ], DashboardListMenuButton);
    return DashboardListMenuButton;
}(React.Component));
exports.DashboardListMenuButton = DashboardListMenuButton;
var DashboardListMenuButtonContainer = /** @class */ (function (_super) {
    __extends(DashboardListMenuButtonContainer, _super);
    function DashboardListMenuButtonContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onRenderSync = function () {
            return React.createElement(Button_1.DefaultButton, { className: "dashboard-list-menu-button app-menu-button" }, "Loading...");
        };
        _this._onRenderDone = function () {
            return React.createElement(DashboardListMenuButton, __assign({}, _this.props));
        };
        _this._onRenderError = function () {
            return React.createElement(Button_1.DefaultButton, { className: "dashboard-list-menu-button app-menu-button error" }, "Error");
        };
        return _this;
    }
    DashboardListMenuButtonContainer.prototype.render = function () {
        return React.createElement(Sync_1.Sync, { sync: this.props.dashboardList.sync, onRenderSync: this._onRenderSync, onRenderDone: this._onRenderDone });
    };
    return DashboardListMenuButtonContainer;
}(React.Component));
exports.DashboardListMenuButtonContainer = DashboardListMenuButtonContainer;
var DashboardListMenuApp = /** @class */ (function (_super) {
    __extends(DashboardListMenuApp, _super);
    function DashboardListMenuApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardListMenuApp.prototype.render = function () {
        return React.createElement(DashboardListMenuButton, { dashboardList: DashboardListStore_1.DashboardListStore });
    };
    return DashboardListMenuApp;
}(React.Component));
exports.DashboardListMenuApp = DashboardListMenuApp;
//# sourceMappingURL=DashboardListMenuButton.js.map