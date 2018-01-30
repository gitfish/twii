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
var Button_1 = require("office-ui-fabric-react/lib/Button");
var ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
var DashboardListStore_1 = require("../DashboardListStore");
var Sync_1 = require("@twii/ui-core/lib/common/component/Sync");
var Error_1 = require("@twii/ui-core/lib/common/component/Error");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var onListClick = function (e, item) {
    item.dashboard.listLayout();
};
var onTabsClick = function (e, item) {
    item.dashboard.stackLayout();
};
var onTwoColumnSplitClick = function (e, item) {
    item.dashboard.twoColumnSplitLayout();
};
var onThreeColumnSplitClick = function (e, item) {
    item.dashboard.threeColumnSplitLayout();
};
var createDashboardLayoutItems = function (dashboard) {
    return [
        {
            dashboard: dashboard,
            key: "list",
            name: "Basic",
            iconProps: { iconName: "CollapseMenu" },
            onClick: onListClick,
            checked: dashboard.isListLayout,
            canCheck: true
        },
        {
            dashboard: dashboard,
            key: "stack",
            name: "Tabs",
            iconProps: { iconName: "Redeploy" },
            onClick: onTabsClick,
            checked: dashboard.isStackLayout,
            canCheck: true
        },
        {
            dashboard: dashboard,
            key: "twoColumnSplit",
            name: "Two Columns",
            iconProps: { iconName: "DoubleColumn" },
            onClick: onTwoColumnSplitClick,
            checked: dashboard.isTwoColumnSplitLayout,
            canCheck: true
        },
        {
            dashboard: dashboard,
            key: "threeColumnSplit",
            name: "Three Columns",
            iconProps: { iconName: "TripleColumn" },
            onClick: onThreeColumnSplitClick,
            checked: dashboard.isThreeColumnSplitLayout,
            canCheck: true
        },
        {
            dashboard: dashboard,
            key: "other",
            name: "Custom",
            iconProps: { iconName: "ViewDashboard" },
            checked: dashboard.isOtherLayout,
            canCheck: true,
            disabled: true
        }
    ];
};
exports.createDashboardLayoutItems = createDashboardLayoutItems;
var createDashboardLayoutSectionItem = function (dashboard) {
    var layoutItems = createDashboardLayoutItems(dashboard);
    return {
        key: "layoutSectionItem",
        itemType: ContextualMenu_1.ContextualMenuItemType.Section,
        sectionProps: {
            key: "layoutSection",
            title: "Layout",
            items: layoutItems
        }
    };
};
exports.createDashboardLayoutSectionItem = createDashboardLayoutSectionItem;
var createDashboardLayoutItem = function (dashboard) {
    var layoutSectionItem = createDashboardLayoutSectionItem(dashboard);
    var current = layoutSectionItem.sectionProps.items.find(function (item) { return item.checked; });
    return {
        key: "dashboardLayout",
        name: dashboard.sync.syncing ? "Loading..." : dashboard.sync.error ? "Error" : current ? current.name : "Layout",
        iconProps: current ? current.iconProps : { iconName: "ViewDashboard" },
        subMenuProps: {
            items: [layoutSectionItem]
        }
    };
};
exports.createDashboardLayoutItem = createDashboardLayoutItem;
var createDashboardSettingsItem = function (dashboard, name) {
    var layoutSectionItem = createDashboardLayoutSectionItem(dashboard);
    return {
        key: "dashboardSettings",
        name: name,
        iconProps: { iconName: "Settings" },
        subMenuProps: {
            items: [layoutSectionItem]
        }
    };
};
exports.createDashboardSettingsItem = createDashboardSettingsItem;
var DashboardLayoutButton = /** @class */ (function (_super) {
    __extends(DashboardLayoutButton, _super);
    function DashboardLayoutButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardLayoutButton.prototype.render = function () {
        if (this.props.dashboard) {
            var layoutSectionItem = createDashboardLayoutSectionItem(this.props.dashboard);
            var current = layoutSectionItem.sectionProps.items.find(function (item) { return item.checked; });
            var menuProps = {
                items: [layoutSectionItem]
            };
            var buttonTitle = current ? current.name : "Layout";
            return (React.createElement(Button_1.DefaultButton, { title: buttonTitle, text: buttonTitle, className: "dashboard-layout-menu-button app-menu-button app-menu-button-with-dropdown", iconProps: current ? current.iconProps : { iconName: "ViewDashboard" }, menuProps: menuProps }));
        }
        return null;
    };
    DashboardLayoutButton = __decorate([
        mobx_react_1.observer
    ], DashboardLayoutButton);
    return DashboardLayoutButton;
}(React.Component));
exports.DashboardLayoutButton = DashboardLayoutButton;
var DashboardLayoutButtonContainer = /** @class */ (function (_super) {
    __extends(DashboardLayoutButtonContainer, _super);
    function DashboardLayoutButtonContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onRenderDone = function () {
            return React.createElement(DashboardLayoutButton, __assign({}, _this.props));
        };
        _this._onRenderError = function (error) {
            return React.createElement(Error_1.CompactError, { error: error });
        };
        _this._onRenderLoad = function () {
            return React.createElement(Spinner_1.Spinner, { size: Spinner_1.SpinnerSize.small, ariaLabel: "Loading..." });
        };
        return _this;
    }
    DashboardLayoutButtonContainer.prototype.render = function () {
        return React.createElement(Sync_1.Sync, { sync: this.props.dashboard.sync, onRenderSync: this._onRenderLoad, onRenderError: this._onRenderError, onRenderDone: this._onRenderDone });
    };
    return DashboardLayoutButtonContainer;
}(React.Component));
exports.DashboardLayoutButtonContainer = DashboardLayoutButtonContainer;
var DashboardListLayoutActiveButton = /** @class */ (function (_super) {
    __extends(DashboardListLayoutActiveButton, _super);
    function DashboardListLayoutActiveButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardListLayoutActiveButton.prototype.render = function () {
        if (this.props.dashboardList && this.props.dashboardList.active) {
            return React.createElement(DashboardLayoutButton, { dashboard: this.props.dashboardList.active });
        }
        return null;
    };
    DashboardListLayoutActiveButton = __decorate([
        mobx_react_1.observer
    ], DashboardListLayoutActiveButton);
    return DashboardListLayoutActiveButton;
}(React.Component));
exports.DashboardListLayoutActiveButton = DashboardListLayoutActiveButton;
var DashboardListLayoutActiveButtonContainer = /** @class */ (function (_super) {
    __extends(DashboardListLayoutActiveButtonContainer, _super);
    function DashboardListLayoutActiveButtonContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onRenderDone = function () {
            return React.createElement(DashboardListLayoutActiveButton, __assign({}, _this.props));
        };
        _this._onRenderError = function (error) {
            return React.createElement(Error_1.CompactError, { error: error });
        };
        _this._onRenderLoad = function () {
            return React.createElement(Spinner_1.Spinner, { size: Spinner_1.SpinnerSize.small, ariaLabel: "Loading..." });
        };
        return _this;
    }
    DashboardListLayoutActiveButtonContainer.prototype.render = function () {
        return React.createElement(Sync_1.Sync, { sync: this.props.dashboardList.sync, onRenderSync: this._onRenderLoad, onRenderError: this._onRenderError, onRenderDone: this._onRenderDone });
    };
    return DashboardListLayoutActiveButtonContainer;
}(React.Component));
exports.DashboardListLayoutActiveButtonContainer = DashboardListLayoutActiveButtonContainer;
var DashboardListLayoutApplet = /** @class */ (function (_super) {
    __extends(DashboardListLayoutApplet, _super);
    function DashboardListLayoutApplet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardListLayoutApplet.prototype.render = function () {
        return React.createElement(DashboardListLayoutActiveButtonContainer, { dashboardList: DashboardListStore_1.DashboardListStore });
    };
    return DashboardListLayoutApplet;
}(React.Component));
exports.DashboardListLayoutApplet = DashboardListLayoutApplet;
//# sourceMappingURL=DashboardLayoutButton.js.map