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
var ComponentIdSequence_1 = require("./ComponentIdSequence");
var EventEmitter_1 = require("@twii/core/lib/common/EventEmitter");
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super.call(this) || this;
        _this._id = ComponentIdSequence_1.ComponentIdSequence.next();
        return _this;
    }
    Object.defineProperty(Component.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "top", {
        get: function () {
            return this.parent ? this.parent.top : this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "addApplet", {
        get: function () {
            if (this._addApplet !== undefined) {
                return this._addApplet;
            }
            var p = this.parent;
            if (p === this) {
                console.warn("-- Ancestor Resolution Cycle Detected");
                return undefined;
            }
            return p ? p.addApplet : undefined;
        },
        set: function (addApplet) {
            this.setAddApplet(addApplet);
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.setAddApplet = function (addApplet) {
        this._addApplet = addApplet;
    };
    Object.defineProperty(Component.prototype, "dashboard", {
        get: function () {
            var p = this.parent;
            if (p === this) {
                console.warn("-- Dashboard Resolution Cycle Detected");
                return undefined;
            }
            return p ? p.dashboard : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.remove = function (comp) {
        // does nothing by default
    };
    Component.prototype.removeFromParent = function () {
        if (this.parent) {
            this.parent.remove(this);
            this.parent = undefined;
        }
    };
    Component.prototype.replace = function (newItem, oldItem) {
        // does nothing by default
    };
    Object.defineProperty(Component.prototype, "config", {
        get: function () {
            // default impl
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.setConfig = function (config) {
        return Promise.resolve();
    };
    Component.prototype._visitChildren = function (callback) {
        // does nothing by default
    };
    Component.prototype.visit = function (callback) {
        callback(this);
    };
    Component.prototype._findFirstChild = function (predicate) {
        return undefined;
    };
    Component.prototype.findFirst = function (predicate) {
        if (predicate(this)) {
            return this;
        }
        return this._findFirstChild(predicate);
    };
    Component.prototype._findAllChildren = function (predicate) {
        return [];
    };
    Component.prototype.findAll = function (predicate) {
        var r = [];
        if (predicate(this)) {
            r.push(this);
        }
        var tr = this._findAllChildren(predicate);
        if (tr && tr.length > 0) {
            r = r.concat(tr);
        }
        return r;
    };
    Component.prototype.unmount = function () {
        // does nothing by default
    };
    Component.prototype.toJSON = function () {
        return this.config;
    };
    __decorate([
        mobx_1.observable.ref
    ], Component.prototype, "parent", void 0);
    __decorate([
        mobx_1.observable
    ], Component.prototype, "_addApplet", void 0);
    __decorate([
        mobx_1.computed
    ], Component.prototype, "addApplet", null);
    __decorate([
        mobx_1.action
    ], Component.prototype, "setAddApplet", null);
    __decorate([
        mobx_1.computed
    ], Component.prototype, "dashboard", null);
    __decorate([
        mobx_1.action
    ], Component.prototype, "setConfig", null);
    __decorate([
        mobx_1.action
    ], Component.prototype, "unmount", null);
    return Component;
}(EventEmitter_1.EventEmitter));
exports.Component = Component;
//# sourceMappingURL=Component.js.map