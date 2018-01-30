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
var React = require("react");
var mobx_react_1 = require("mobx-react");
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var ComponentRemoveDialog = /** @class */ (function (_super) {
    __extends(ComponentRemoveDialog, _super);
    function ComponentRemoveDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onClickCancel = function () {
            _this.props.remove.cancel();
        };
        _this._onClickSave = function () {
            _this.props.remove.save();
        };
        _this._onDismissed = function () {
            _this.props.remove.cancel();
        };
        return _this;
    }
    ComponentRemoveDialog.prototype.render = function () {
        var footer = (React.createElement(Dialog_1.DialogFooter, null,
            React.createElement(Button_1.DefaultButton, { className: "dashboard-form-action", onClick: this._onClickCancel }, "Cancel"),
            React.createElement(Button_1.PrimaryButton, { className: "dashboard-form-action", onClick: this._onClickSave }, "OK")));
        var c = this.props.remove.component;
        var title;
        if (c) {
            if (c.type === "stack" || c.type === "list") {
                title = "all Widgets";
            }
        }
        if (!title) {
            title = "the Widget";
        }
        return (React.createElement(Dialog_1.Dialog, { hidden: !this.props.remove.active, onDismiss: this._onDismissed, dialogContentProps: {
                title: "Close " + title,
                subText: "Are you sure you want to close " + title + "?"
            } }, footer));
    };
    ComponentRemoveDialog = __decorate([
        mobx_react_1.observer
    ], ComponentRemoveDialog);
    return ComponentRemoveDialog;
}(React.Component));
exports.ComponentRemoveDialog = ComponentRemoveDialog;
//# sourceMappingURL=ComponentRemove.js.map