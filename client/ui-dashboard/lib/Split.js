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
var ComponentFactoryRouter_1 = require("./ComponentFactoryRouter");
var ComponentTypes = require("./ComponentTypes");
var Defaults = {
    offset: 0.5
};
var Split = /** @class */ (function (_super) {
    __extends(Split, _super);
    function Split() {
        var _this = _super.call(this) || this;
        _this._offset = Defaults.offset;
        _this._splitActive = false;
        _this._onResize = function () {
            if (_this._first) {
                _this._first.emit({ type: "resize" });
            }
            if (_this._second) {
                _this._second.emit({ type: "resize" });
            }
        };
        _this.addEventListener("resize", _this._onResize);
        return _this;
    }
    Object.defineProperty(Split.prototype, "splitActive", {
        get: function () {
            return this._splitActive;
        },
        set: function (value) {
            this.setSplitActive(value);
        },
        enumerable: true,
        configurable: true
    });
    Split.prototype.setSplitActive = function (splitActive) {
        this._splitActive = splitActive;
        var db = this.dashboard;
        if (splitActive) {
            db.setBlockSource(this);
        }
        else if (db.blockSource === this) {
            db.clearBlockSource();
        }
    };
    Object.defineProperty(Split.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (value) {
            this.setFirst(value);
        },
        enumerable: true,
        configurable: true
    });
    Split.prototype.setFirst = function (first) {
        if (first !== this._first) {
            if (first && first.parent !== this) {
                first.removeFromParent();
            }
            this._first = first;
            if (this._first) {
                this._first.parent = this;
            }
        }
    };
    Object.defineProperty(Split.prototype, "firstConfig", {
        get: function () {
            return this._first ? { component: this._first.config } : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Split.prototype.setFirstConfig = function (config) {
        var _this = this;
        if (config && config.component) {
            return ComponentFactoryRouter_1.ComponentFactoryRouter.handleRequest({ path: config.component.type }).then(function (component) {
                _this.setFirst(component);
                return component.setConfig(config.component);
            });
        }
        this.setFirst(undefined);
        return Promise.resolve();
    };
    Object.defineProperty(Split.prototype, "second", {
        get: function () {
            return this._second;
        },
        set: function (value) {
            this.setSecond(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Split.prototype, "secondConfig", {
        get: function () {
            return this._second ? { component: this._second.config } : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Split.prototype.setSecond = function (second) {
        if (second !== this._second) {
            if (second && second.parent !== this) {
                second.removeFromParent();
            }
            this._second = second;
            if (this._second) {
                this._second.parent = this;
            }
        }
    };
    Split.prototype.setSecondConfig = function (config) {
        var _this = this;
        if (config && config.component) {
            return ComponentFactoryRouter_1.ComponentFactoryRouter.handleRequest({ path: config.component.type }).then(function (component) {
                _this.setSecond(component);
                return component.setConfig(config.component);
            });
        }
        this.setSecond(undefined);
        return Promise.resolve();
    };
    Object.defineProperty(Split.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (value) {
            this.setOffset(value);
        },
        enumerable: true,
        configurable: true
    });
    Split.prototype.setOffset = function (offset) {
        if (!isNaN(offset) && offset !== this._offset && offset >= 0) {
            this._offset = offset;
        }
    };
    Split.prototype.replace = function (newComp, oldComp) {
        if (oldComp === this._first || oldComp === this._second) {
            if (oldComp === this._first) {
                this.setFirst(newComp);
            }
            else if (oldComp === this._second) {
                this.setSecond(newComp);
            }
        }
    };
    Split.prototype.remove = function (comp) {
        if (comp === this._first || comp === this._second) {
            var replacement = comp === this._first ? this._second : this._first;
            // clear the parent for both left and right
            if (this._first) {
                this._first.parent = undefined;
            }
            if (this._second) {
                this._second.parent = undefined;
            }
            if (this.parent) {
                this.parent.replace(replacement, this);
            }
        }
    };
    Split.prototype._visitChildren = function (callback) {
        if (this._first) {
            this._first.visit(callback);
        }
        if (this._second) {
            this._second.visit(callback);
        }
    };
    Split.prototype._findFirstChild = function (predicate) {
        var r;
        if (this._first) {
            r = this._first.findFirst(predicate);
        }
        if (!r) {
            r = this._second.findFirst(predicate);
        }
        return r;
    };
    Split.prototype._findAllChildren = function (predicate) {
        var r = [];
        var lr = this._first ? this._first.findAll(predicate) : undefined;
        var rr = this._second ? this._second.findAll(predicate) : undefined;
        if (lr) {
            r = r.concat(lr);
        }
        if (rr) {
            r = r.concat(rr);
        }
        return r;
    };
    Split.prototype.unmount = function () {
        if (this.first) {
            this.first.unmount();
        }
        if (this.second) {
            this.second.unmount();
        }
    };
    __decorate([
        mobx_1.observable
    ], Split.prototype, "_offset", void 0);
    __decorate([
        mobx_1.observable
    ], Split.prototype, "_first", void 0);
    __decorate([
        mobx_1.observable
    ], Split.prototype, "_second", void 0);
    __decorate([
        mobx_1.observable
    ], Split.prototype, "_splitActive", void 0);
    __decorate([
        mobx_1.computed
    ], Split.prototype, "splitActive", null);
    __decorate([
        mobx_1.action
    ], Split.prototype, "setSplitActive", null);
    __decorate([
        mobx_1.computed
    ], Split.prototype, "first", null);
    __decorate([
        mobx_1.action
    ], Split.prototype, "setFirst", null);
    __decorate([
        mobx_1.computed
    ], Split.prototype, "firstConfig", null);
    __decorate([
        mobx_1.action
    ], Split.prototype, "setFirstConfig", null);
    __decorate([
        mobx_1.computed
    ], Split.prototype, "second", null);
    __decorate([
        mobx_1.computed
    ], Split.prototype, "secondConfig", null);
    __decorate([
        mobx_1.action
    ], Split.prototype, "setSecond", null);
    __decorate([
        mobx_1.action
    ], Split.prototype, "setSecondConfig", null);
    __decorate([
        mobx_1.computed
    ], Split.prototype, "offset", null);
    __decorate([
        mobx_1.action
    ], Split.prototype, "setOffset", null);
    __decorate([
        mobx_1.action
    ], Split.prototype, "replace", null);
    __decorate([
        mobx_1.action
    ], Split.prototype, "remove", null);
    __decorate([
        mobx_1.action
    ], Split.prototype, "unmount", null);
    return Split;
}(Component_1.Component));
exports.Split = Split;
var HSplit = /** @class */ (function (_super) {
    __extends(HSplit, _super);
    function HSplit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._minItemWidth = 30;
        return _this;
    }
    Object.defineProperty(HSplit.prototype, "type", {
        get: function () {
            return ComponentTypes.hsplit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HSplit.prototype, "minItemWidth", {
        get: function () {
            return this._minItemWidth;
        },
        set: function (value) {
            this.setMinItemWidth(value);
        },
        enumerable: true,
        configurable: true
    });
    HSplit.prototype.setMinItemWidth = function (minItemWidth) {
        this._minItemWidth = minItemWidth;
    };
    Object.defineProperty(HSplit.prototype, "left", {
        get: function () {
            return this.first;
        },
        set: function (value) {
            this.setLeft(value);
        },
        enumerable: true,
        configurable: true
    });
    HSplit.prototype.setLeft = function (left) {
        this.setFirst(left);
    };
    Object.defineProperty(HSplit.prototype, "leftConfig", {
        get: function () {
            return this.firstConfig;
        },
        enumerable: true,
        configurable: true
    });
    HSplit.prototype.setLeftConfig = function (config) {
        return this.setFirstConfig(config);
    };
    Object.defineProperty(HSplit.prototype, "right", {
        get: function () {
            return this.second;
        },
        set: function (value) {
            this.setRight(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HSplit.prototype, "rightConfig", {
        get: function () {
            return this.secondConfig;
        },
        enumerable: true,
        configurable: true
    });
    HSplit.prototype.setRight = function (right) {
        this.setSecond(right);
    };
    HSplit.prototype.setRightConfig = function (config) {
        this.setSecondConfig(config);
    };
    Object.defineProperty(HSplit.prototype, "config", {
        get: function () {
            return {
                type: this.type,
                offset: this.offset,
                left: this.leftConfig,
                right: this.rightConfig
            };
        },
        enumerable: true,
        configurable: true
    });
    HSplit.prototype.setConfig = function (config) {
        var _this = this;
        return Promise.all([
            this.setLeftConfig(config ? config.left : undefined),
            this.setRightConfig(config ? config.right : undefined)
        ]).then(function () {
            _this.setOffset(config ? config.offset : Defaults.offset);
        });
    };
    Object.defineProperty(HSplit.prototype, "columnCount", {
        get: function () {
            var left = this.left;
            var right = this.right;
            var leftCount = left && left.type === ComponentTypes.hsplit ? left.columnCount : 1;
            var rightCount = right && right.type === ComponentTypes.hsplit ? right.columnCount : 1;
            return leftCount + rightCount;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], HSplit.prototype, "_minItemWidth", void 0);
    __decorate([
        mobx_1.computed
    ], HSplit.prototype, "minItemWidth", null);
    __decorate([
        mobx_1.action
    ], HSplit.prototype, "setMinItemWidth", null);
    __decorate([
        mobx_1.computed
    ], HSplit.prototype, "left", null);
    __decorate([
        mobx_1.action
    ], HSplit.prototype, "setLeft", null);
    __decorate([
        mobx_1.computed
    ], HSplit.prototype, "leftConfig", null);
    __decorate([
        mobx_1.action
    ], HSplit.prototype, "setLeftConfig", null);
    __decorate([
        mobx_1.computed
    ], HSplit.prototype, "right", null);
    __decorate([
        mobx_1.computed
    ], HSplit.prototype, "rightConfig", null);
    __decorate([
        mobx_1.action
    ], HSplit.prototype, "setRight", null);
    __decorate([
        mobx_1.action
    ], HSplit.prototype, "setRightConfig", null);
    __decorate([
        mobx_1.computed
    ], HSplit.prototype, "config", null);
    __decorate([
        mobx_1.action
    ], HSplit.prototype, "setConfig", null);
    __decorate([
        mobx_1.computed
    ], HSplit.prototype, "columnCount", null);
    return HSplit;
}(Split));
exports.HSplit = HSplit;
var VSplit = /** @class */ (function (_super) {
    __extends(VSplit, _super);
    function VSplit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._minItemHeight = 30;
        return _this;
    }
    Object.defineProperty(VSplit.prototype, "type", {
        get: function () {
            return ComponentTypes.vsplit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VSplit.prototype, "minItemHeight", {
        get: function () {
            return this._minItemHeight;
        },
        set: function (value) {
            this.setMinItemHeight(value);
        },
        enumerable: true,
        configurable: true
    });
    VSplit.prototype.setMinItemHeight = function (minItemHeight) {
        this._minItemHeight = minItemHeight;
    };
    Object.defineProperty(VSplit.prototype, "top", {
        get: function () {
            return this.first;
        },
        set: function (value) {
            this.setTop(value);
        },
        enumerable: true,
        configurable: true
    });
    VSplit.prototype.setTop = function (top) {
        this.setFirst(top);
    };
    Object.defineProperty(VSplit.prototype, "topConfig", {
        get: function () {
            return this.firstConfig;
        },
        enumerable: true,
        configurable: true
    });
    VSplit.prototype.setTopConfig = function (config) {
        return this.setFirstConfig(config);
    };
    Object.defineProperty(VSplit.prototype, "bottom", {
        get: function () {
            return this.second;
        },
        set: function (value) {
            this.setBottom(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VSplit.prototype, "bottomConfig", {
        get: function () {
            return this.secondConfig;
        },
        enumerable: true,
        configurable: true
    });
    VSplit.prototype.setBottom = function (bottom) {
        this.setSecond(bottom);
    };
    VSplit.prototype.setBottomConfig = function (config) {
        return this.setSecondConfig(config);
    };
    Object.defineProperty(VSplit.prototype, "config", {
        get: function () {
            return {
                type: this.type,
                offset: this.offset,
                top: this.topConfig,
                bottom: this.bottomConfig
            };
        },
        enumerable: true,
        configurable: true
    });
    VSplit.prototype.setConfig = function (config) {
        var _this = this;
        return Promise.all([
            this.setTopConfig(config ? config.top : undefined),
            this.setBottomConfig(config ? config.bottom : undefined)
        ]).then(function () {
            _this.setOffset(config ? config.offset : Defaults.offset);
        });
    };
    Object.defineProperty(VSplit.prototype, "rowCount", {
        get: function () {
            var top = this.top;
            var bottom = this.bottom;
            var topCount = top && top.type === ComponentTypes.vsplit ? top.rowCount : 1;
            var bottomCount = bottom && bottom.type === ComponentTypes.vsplit ? bottom.rowCount : 1;
            return topCount + bottomCount;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], VSplit.prototype, "_minItemHeight", void 0);
    __decorate([
        mobx_1.computed
    ], VSplit.prototype, "minItemHeight", null);
    __decorate([
        mobx_1.action
    ], VSplit.prototype, "setMinItemHeight", null);
    __decorate([
        mobx_1.computed
    ], VSplit.prototype, "top", null);
    __decorate([
        mobx_1.action
    ], VSplit.prototype, "setTop", null);
    __decorate([
        mobx_1.computed
    ], VSplit.prototype, "topConfig", null);
    __decorate([
        mobx_1.action
    ], VSplit.prototype, "setTopConfig", null);
    __decorate([
        mobx_1.computed
    ], VSplit.prototype, "bottom", null);
    __decorate([
        mobx_1.computed
    ], VSplit.prototype, "bottomConfig", null);
    __decorate([
        mobx_1.action
    ], VSplit.prototype, "setBottom", null);
    __decorate([
        mobx_1.action
    ], VSplit.prototype, "setBottomConfig", null);
    __decorate([
        mobx_1.computed
    ], VSplit.prototype, "config", null);
    __decorate([
        mobx_1.action
    ], VSplit.prototype, "setConfig", null);
    __decorate([
        mobx_1.computed
    ], VSplit.prototype, "rowCount", null);
    return VSplit;
}(Split));
exports.VSplit = VSplit;
//# sourceMappingURL=Split.js.map