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
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Checkbox_1 = require("office-ui-fabric-react/lib/Checkbox");
require("./DashboardAdd.scss");
var DashboardPropertyEditor = /** @class */ (function (_super) {
    __extends(DashboardPropertyEditor, _super);
    function DashboardPropertyEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._handleTitleChange = function (text) {
            _this.props.dashboard.setTitle(text);
        };
        return _this;
    }
    DashboardPropertyEditor.prototype.render = function () {
        return (React.createElement("div", { className: "dashboard-property-editor" },
            React.createElement(TextField_1.TextField, { label: "Title", value: this.props.dashboard.title || "", onChanged: this._handleTitleChange })));
    };
    DashboardPropertyEditor = __decorate([
        mobx_react_1.observer
    ], DashboardPropertyEditor);
    return DashboardPropertyEditor;
}(React.Component));
var DashboardAddFormActions = /** @class */ (function (_super) {
    __extends(DashboardAddFormActions, _super);
    function DashboardAddFormActions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onClickCancel = function () {
            _this.props.add.cancel();
        };
        _this._onClickSave = function () {
            _this.props.add.save();
        };
        return _this;
    }
    DashboardAddFormActions.prototype.render = function () {
        return (React.createElement("div", { className: "dashboard-add-form-actions" },
            React.createElement(Button_1.DefaultButton, { className: "dashboard-form-action", onClick: this._onClickCancel }, "Cancel"),
            React.createElement(Button_1.PrimaryButton, { className: "dashboard-form-action", onClick: this._onClickSave, disabled: !this.props.add.saveEnabled }, "OK")));
    };
    DashboardAddFormActions = __decorate([
        mobx_react_1.observer
    ], DashboardAddFormActions);
    return DashboardAddFormActions;
}(React.Component));
var ExistingDashboardSelector = /** @class */ (function (_super) {
    __extends(ExistingDashboardSelector, _super);
    function ExistingDashboardSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onChange = function (option) {
            var dashboard = _this.props.add.dashboardList.dashboards.find(function (db) { return db.id === option.key; });
            if (dashboard) {
                _this.props.add.setExisting(dashboard);
            }
        };
        return _this;
    }
    ExistingDashboardSelector.prototype.render = function () {
        if (this.props.add.dashboardList.dashboardCount > 0) {
            var options = this.props.add.dashboardList.dashboards.map(function (db) {
                return {
                    key: db.id,
                    text: db.title
                };
            });
            return React.createElement(Dropdown_1.Dropdown, { label: "From Existing", options: options, onChanged: this._onChange, selectedKey: this.props.add.existing ? this.props.add.existing.id : undefined });
        }
        return null;
    };
    ExistingDashboardSelector = __decorate([
        mobx_react_1.observer
    ], ExistingDashboardSelector);
    return ExistingDashboardSelector;
}(React.Component));
var DashboardAddForm = /** @class */ (function (_super) {
    __extends(DashboardAddForm, _super);
    function DashboardAddForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onKeyDown = function (e) {
            if (e.which === 13 /* enter */ && _this.props.add.saveEnabled) {
                _this.props.add.save();
            }
        };
        _this._onMakeActiveChange = function (e, checked) {
            _this.props.add.setMakeActive(checked);
        };
        return _this;
    }
    DashboardAddForm.prototype.render = function () {
        if (this.props.add.active) {
            return (React.createElement("div", { className: "dashboard-add-form" },
                React.createElement(DashboardPropertyEditor, { dashboard: this.props.add.dashboard }),
                React.createElement(ExistingDashboardSelector, __assign({}, this.props)),
                React.createElement(Checkbox_1.Checkbox, { label: "Set Dashboard Active", onChange: this._onMakeActiveChange, checked: this.props.add.makeActive })));
        }
        return null;
    };
    DashboardAddForm = __decorate([
        mobx_react_1.observer
    ], DashboardAddForm);
    return DashboardAddForm;
}(React.Component));
var DashboardAddPanel = /** @class */ (function (_super) {
    __extends(DashboardAddPanel, _super);
    function DashboardAddPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onRenderFooterContent = function () {
            return React.createElement(DashboardAddFormActions, __assign({}, _this.props));
        };
        _this._onRenderBody = function () {
            return React.createElement(DashboardAddForm, __assign({}, _this.props));
        };
        _this._onDismiss = function () {
            _this.props.add.cancel();
        };
        return _this;
    }
    DashboardAddPanel.prototype.render = function () {
        return (React.createElement(Panel_1.Panel, { isOpen: this.props.add.active, isLightDismiss: true, onRenderFooterContent: this._onRenderFooterContent, onRenderBody: this._onRenderBody, headerText: "Add Dashboard", type: Panel_1.PanelType.medium, onDismiss: this._onDismiss }));
    };
    DashboardAddPanel = __decorate([
        mobx_react_1.observer
    ], DashboardAddPanel);
    return DashboardAddPanel;
}(React.Component));
exports.DashboardAddPanel = DashboardAddPanel;
//# sourceMappingURL=DashboardAdd.js.map