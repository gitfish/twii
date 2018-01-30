"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var ComponentRemoveModel = /** @class */ (function () {
    function ComponentRemoveModel() {
        this.active = false;
    }
    ComponentRemoveModel.prototype.init = function (opts) {
        this.component = opts.component;
        this._saveHandler = opts.saveHandler;
        this.active = true;
    };
    ComponentRemoveModel.prototype._close = function () {
        //this.component = undefined;
        this.active = false;
    };
    ComponentRemoveModel.prototype.save = function () {
        if (this._saveHandler) {
            this._saveHandler(this.component);
        }
        else {
            this.component.removeFromParent();
        }
        this._close();
    };
    ComponentRemoveModel.prototype.cancel = function () {
        this._close();
    };
    __decorate([
        mobx_1.observable
    ], ComponentRemoveModel.prototype, "active", void 0);
    __decorate([
        mobx_1.observable
    ], ComponentRemoveModel.prototype, "component", void 0);
    __decorate([
        mobx_1.action
    ], ComponentRemoveModel.prototype, "init", null);
    __decorate([
        mobx_1.action
    ], ComponentRemoveModel.prototype, "_close", null);
    __decorate([
        mobx_1.action
    ], ComponentRemoveModel.prototype, "save", null);
    __decorate([
        mobx_1.action
    ], ComponentRemoveModel.prototype, "cancel", null);
    return ComponentRemoveModel;
}());
exports.ComponentRemoveModel = ComponentRemoveModel;
//# sourceMappingURL=ComponentRemoveModel.js.map