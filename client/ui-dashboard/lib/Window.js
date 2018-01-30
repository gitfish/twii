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
var ComponentTypes = require("./ComponentTypes");
var WindowAppHost_1 = require("./WindowAppHost");
var Window = /** @class */ (function (_super) {
    __extends(Window, _super);
    function Window() {
        var _this = _super.call(this) || this;
        _this._contentHidden = false;
        _this._closeDisabled = false;
        _this._onResizeInternal = function () {
            // this is to ensure that the bound view gets first bite at the cherry
            _this.emit({ type: "resizeview" });
        };
        _this._appHost = new WindowAppHost_1.WindowAppHost(_this);
        _this.addEventListener("resize", _this._onResizeInternal);
        return _this;
    }
    Object.defineProperty(Window.prototype, "appHost", {
        get: function () {
            return this._appHost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (value) {
            this.setPath(value);
        },
        enumerable: true,
        configurable: true
    });
    Window.prototype.setPath = function (path) {
        this._path = path;
    };
    Object.defineProperty(Window.prototype, "params", {
        get: function () {
            return Object.assign({}, this._params, this._query);
        },
        set: function (value) {
            this.setParams(value);
        },
        enumerable: true,
        configurable: true
    });
    Window.prototype.setParams = function (params) {
        this._params = params;
    };
    Object.defineProperty(Window.prototype, "query", {
        get: function () {
            return Object.assign({}, this._query);
        },
        set: function (value) {
            this.setQuery(value);
        },
        enumerable: true,
        configurable: true
    });
    Window.prototype.setQuery = function (query) {
        this._query = query;
    };
    Object.defineProperty(Window.prototype, "title", {
        get: function () {
            return this._appHost.title;
        },
        set: function (value) {
            this.setTitle(value);
        },
        enumerable: true,
        configurable: true
    });
    Window.prototype.setTitle = function (title) {
        this._appHost.setTitle(title);
    };
    Object.defineProperty(Window.prototype, "closeDisabled", {
        get: function () {
            return this._closeDisabled || (this.manager && this.manager.closeDisabled);
        },
        set: function (value) {
            this._closeDisabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "contentHidden", {
        get: function () {
            return this._contentHidden;
        },
        set: function (value) {
            this.setContentHidden(value);
        },
        enumerable: true,
        configurable: true
    });
    Window.prototype.setContentHidden = function (contentHidden) {
        if (contentHidden !== this.contentHidden) {
            this._contentHidden = contentHidden;
            if (this.parent) {
                this.parent.emit({ type: "resize" });
            }
        }
    };
    Window.prototype.toggleContent = function () {
        this.setContentHidden(!this.contentHidden);
    };
    Window.prototype.setCloseDisabled = function (closeDisabled) {
        this._closeDisabled = closeDisabled;
    };
    Object.defineProperty(Window.prototype, "manager", {
        get: function () {
            var parent = this.parent;
            return parent && (parent.type === ComponentTypes.stack || parent.type === ComponentTypes.list) ? parent : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "type", {
        get: function () {
            return ComponentTypes.window;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Window.prototype, "active", {
        get: function () {
            var manager = this.manager;
            return manager ? manager.active === this : false;
        },
        enumerable: true,
        configurable: true
    });
    Window.prototype.activate = function () {
        var manager = this.manager;
        if (manager) {
            manager.setActive(this);
        }
    };
    Object.defineProperty(Window.prototype, "config", {
        get: function () {
            return {
                type: this.type,
                path: this._path,
                params: this._params,
                query: this._query,
                closeDisabled: this._closeDisabled,
                contentHidden: this._contentHidden
            };
        },
        enumerable: true,
        configurable: true
    });
    Window.prototype.setConfig = function (config) {
        this.setTitle(config ? config.title : undefined);
        this.setCloseDisabled(config ? config.closeDisabled : undefined);
        this.setPath(config ? config.path : undefined);
        this.setParams(config ? config.params : undefined);
        this.setQuery(config ? config.query : undefined);
        this.setContentHidden(config ? config.contentHidden : undefined);
        return Promise.resolve();
    };
    Window.prototype.open = function (request) {
        var manager = this.manager;
        if (manager) {
            return manager.open(request);
        }
        return Promise.reject({ code: "INVALID_STATE", message: "No Window Manager Set" });
    };
    Window.prototype.load = function (request) {
        return this.appHost.load(request);
    };
    Window.prototype.close = function () {
        if (this.onClose) {
            this.onClose(this);
        }
    };
    Object.defineProperty(Window.prototype, "portal", {
        get: function () {
            return this.dashboard ? this.dashboard.getPortal(this) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], Window.prototype, "_path", void 0);
    __decorate([
        mobx_1.observable
    ], Window.prototype, "_params", void 0);
    __decorate([
        mobx_1.observable
    ], Window.prototype, "_query", void 0);
    __decorate([
        mobx_1.observable
    ], Window.prototype, "_appHost", void 0);
    __decorate([
        mobx_1.observable
    ], Window.prototype, "_contentHidden", void 0);
    __decorate([
        mobx_1.observable
    ], Window.prototype, "_closeDisabled", void 0);
    __decorate([
        mobx_1.computed
    ], Window.prototype, "appHost", null);
    __decorate([
        mobx_1.computed
    ], Window.prototype, "path", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "setPath", null);
    __decorate([
        mobx_1.computed
    ], Window.prototype, "params", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "setParams", null);
    __decorate([
        mobx_1.computed
    ], Window.prototype, "query", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "setQuery", null);
    __decorate([
        mobx_1.computed
    ], Window.prototype, "title", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "setTitle", null);
    __decorate([
        mobx_1.computed
    ], Window.prototype, "closeDisabled", null);
    __decorate([
        mobx_1.computed
    ], Window.prototype, "contentHidden", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "setContentHidden", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "toggleContent", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "setCloseDisabled", null);
    __decorate([
        mobx_1.computed
    ], Window.prototype, "manager", null);
    __decorate([
        mobx_1.computed
    ], Window.prototype, "active", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "activate", null);
    __decorate([
        mobx_1.computed
    ], Window.prototype, "config", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "setConfig", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "load", null);
    __decorate([
        mobx_1.action
    ], Window.prototype, "close", null);
    return Window;
}(Component_1.Component));
exports.Window = Window;
//# sourceMappingURL=Window.js.map