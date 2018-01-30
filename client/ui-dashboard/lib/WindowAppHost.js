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
var AbstractAppHost_1 = require("@twii/core/lib/app/AbstractAppHost");
var WindowAppHost = /** @class */ (function (_super) {
    __extends(WindowAppHost, _super);
    function WindowAppHost(window) {
        var _this = _super.call(this) || this;
        _this._window = window;
        return _this;
    }
    Object.defineProperty(WindowAppHost.prototype, "defaultRequest", {
        get: function () {
            return { path: this._window.path, params: this._window.params, query: this._window.query };
        },
        enumerable: true,
        configurable: true
    });
    WindowAppHost.prototype.open = function (request) {
        return this._window.open(request).then(function (w) {
            return w.appHost;
        });
    };
    WindowAppHost.prototype.setRequest = function (request) {
        _super.prototype.setRequest.call(this, request);
        if (request && request.replace) {
            this._window.setPath(request.path);
            this._window.setParams(request.params);
            this._window.setQuery(request.query);
        }
    };
    WindowAppHost.prototype.close = function () {
        this._window.close();
    };
    WindowAppHost.prototype.addEventListener = function (type, handler) {
        this._window.addEventListener(type, handler);
    };
    WindowAppHost.prototype.removeEventListener = function (type, handler) {
        this._window.addEventListener(type, handler);
    };
    WindowAppHost.prototype.emit = function (event) {
        this._window.emit(event);
    };
    __decorate([
        mobx_1.action
    ], WindowAppHost.prototype, "setRequest", null);
    return WindowAppHost;
}(AbstractAppHost_1.AbstractAppHost));
exports.default = WindowAppHost;
exports.WindowAppHost = WindowAppHost;
//# sourceMappingURL=WindowAppHost.js.map