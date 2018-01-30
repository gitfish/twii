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
var Window_1 = require("./Window");
var ComponentTypes = require("./ComponentTypes");
/**
 * Stack - a bunch/stack of windows
 */
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        var _this = _super.call(this) || this;
        _this._closeDisabled = false;
        _this.windows = [];
        _this._onResize = function () {
            _this.notifyResizeWindows();
        };
        _this._replaceWithListModuleLoaded = function (m) {
            var active = _this.active;
            var list = new m.List();
            list.setCloseDisabled(_this._closeDisabled);
            _this.parent.replace(list, _this);
            while (_this.windows.length > 0) {
                list.add(_this.windows[0], false);
            }
            list.setActive(active);
            if (active) {
                list.setPendingScrollTo(active);
            }
        };
        _this.addEventListener("resize", _this._onResize);
        return _this;
    }
    Stack.prototype.notifyResizeWindows = function () {
        this.windows.forEach(function (w) { return w.emit({ type: "resize" }); });
    };
    Object.defineProperty(Stack.prototype, "type", {
        get: function () {
            return ComponentTypes.stack;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stack.prototype, "windowCount", {
        get: function () {
            return this.windows ? this.windows.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stack.prototype, "closeDisabled", {
        get: function () {
            return this._closeDisabled || (this.dashboard && this.dashboard.closeDisabled);
        },
        set: function (value) {
            this.setCloseDisabled(value);
        },
        enumerable: true,
        configurable: true
    });
    Stack.prototype.setCloseDisabled = function (closeDisabled) {
        this._closeDisabled = closeDisabled;
    };
    Object.defineProperty(Stack.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex || 0;
        },
        set: function (value) {
            this.setActiveIndex(value);
        },
        enumerable: true,
        configurable: true
    });
    Stack.prototype.setActiveIndex = function (activeIndex) {
        if (activeIndex !== this._activeIndex) {
            this._activeIndex = activeIndex;
        }
    };
    Object.defineProperty(Stack.prototype, "first", {
        get: function () {
            return this.windowCount > 0 ? this.windows[0] : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stack.prototype, "last", {
        get: function () {
            return this.windowCount > 0 ? this.windows[this.windows.length - 1] : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stack.prototype, "active", {
        get: function () {
            return this.activeIndex >= 0 && this.activeIndex < this.windows.length ? this.windows[this.activeIndex] : undefined;
        },
        set: function (value) {
            this.setActive(value);
        },
        enumerable: true,
        configurable: true
    });
    Stack.prototype.setActive = function (active) {
        this.setActiveIndex(this.windows.indexOf(active));
    };
    Stack.prototype.add = function (win, makeActive) {
        if (makeActive === void 0) { makeActive = true; }
        if (win) {
            if (win.parent !== this) {
                win.removeFromParent();
                win.parent = this;
            }
            else {
                var itemIdx = this.windows.indexOf(win);
                this.windows.splice(itemIdx, 1);
            }
            this.windows.push(win);
            if (makeActive) {
                this.setActive(win);
            }
        }
    };
    Stack.prototype.open = function (request) {
        var win;
        if (request && request.replace && request.name) {
            var db = this.dashboard;
            win = db.findFirst(function (w) {
                return w.type === "window" ? w.name === request.name : false;
            });
        }
        if (!win) {
            win = new Window_1.Window();
            if (request) {
                win.setPath(request.path);
                win.setParams(request.params);
                win.setQuery(request.query);
                if (request.title) {
                    win.setTitle(request.title);
                }
            }
            this.add(win, request && request.makeActive !== undefined ? request.makeActive : true);
        }
        else {
            win.load(request);
        }
        return Promise.resolve(win);
    };
    Stack.prototype.addNew = function () {
        if (this.dashboard && this.dashboard.addApplet) {
            return this.open(this.dashboard.addApplet);
        }
        return Promise.resolve();
    };
    Stack.prototype.insertAt = function (item, index) {
        if (item && index >= 0 && index < this.windows.length) {
            var refStackItem = this.windows[index];
            var insertIdx = -1;
            if (item.parent !== this) {
                item.removeFromParent();
                item.parent = this;
                insertIdx = index;
            }
            else {
                var itemIdx = this.windows.indexOf(item);
                if (itemIdx >= 0 && itemIdx !== index) {
                    this.windows.splice(itemIdx, 1);
                    insertIdx = this.windows.indexOf(refStackItem);
                }
            }
            if (insertIdx >= 0) {
                this.windows.splice(insertIdx, 0, item);
            }
        }
        else {
            this.add(item);
        }
    };
    Stack.prototype.dropWindow = function (refWindow) {
        var drag = this.dashboard ? this.dashboard.drag : undefined;
        if (drag) {
            var win = drag;
            if (refWindow) {
                if (drag.parent === this) {
                    var dragIdx = this.windows.indexOf(win);
                    var refIdx = this.windows.indexOf(refWindow);
                    this.insertAt(win, dragIdx > refIdx ? refIdx : refIdx + 1);
                }
                else {
                    this.insertBefore(win, refWindow);
                }
            }
            else {
                this.add(win, false);
            }
            this.setActive(win);
            this.dashboard.clearDrag();
        }
    };
    Stack.prototype.splitLeft = function (newComp) {
        var _this = this;
        var right = this;
        return Promise.resolve().then(function () { return require("./Split"); }).then(function (m) {
            var split = new m.HSplit();
            var newStack = new Stack();
            newStack.setCloseDisabled(_this._closeDisabled);
            split.setLeft(newStack);
            _this.parent.replace(split, _this);
            if (newComp) {
                newStack.add(newComp);
            }
            else {
                newStack.addNew();
            }
            split.setRight(_this);
        });
    };
    Stack.prototype.splitRight = function (newComp) {
        var _this = this;
        var left = this;
        return Promise.resolve().then(function () { return require("./Split"); }).then(function (m) {
            var split = new m.HSplit();
            var newStack = new Stack();
            newStack.setCloseDisabled(_this._closeDisabled);
            split.setRight(newStack);
            _this.parent.replace(split, _this);
            if (newComp) {
                newStack.add(newComp);
            }
            else {
                newStack.addNew();
            }
            split.setLeft(_this);
        });
    };
    Stack.prototype.splitTop = function (newComp) {
        var _this = this;
        var bottom = this;
        return Promise.resolve().then(function () { return require("./Split"); }).then(function (m) {
            var split = new m.VSplit();
            var newStack = new Stack();
            newStack.setCloseDisabled(_this._closeDisabled);
            split.setTop(newStack);
            _this.parent.replace(split, _this);
            if (newComp) {
                newStack.add(newComp);
            }
            else {
                newStack.addNew();
            }
            split.setBottom(bottom);
        });
    };
    Stack.prototype.splitBottom = function (newComp) {
        var _this = this;
        var top = this;
        return Promise.resolve().then(function () { return require("./Split"); }).then(function (m) {
            var split = new m.VSplit();
            var newStack = new Stack();
            newStack.setCloseDisabled(_this._closeDisabled);
            split.setBottom(newStack);
            _this.parent.replace(split, _this);
            if (newComp) {
                newStack.add(newComp);
            }
            else {
                newStack.addNew();
            }
            split.setTop(top);
        });
    };
    Stack.prototype.insertBefore = function (item, refItem) {
        if (!refItem) {
            this.add(item);
        }
        else if (item) {
            this.insertAt(item, this.windows.indexOf(refItem));
        }
    };
    Stack.prototype.replace = function (newItem, oldItem) {
        if (newItem && oldItem && oldItem.parent === this) {
            this.insertBefore(newItem, oldItem);
            oldItem.removeFromParent();
        }
    };
    Object.defineProperty(Stack.prototype, "config", {
        get: function () {
            return {
                type: this.type,
                activeIndex: this.activeIndex,
                windows: this.windows.map(function (w) { return w.config; }),
                closeDisabled: this._closeDisabled
            };
        },
        enumerable: true,
        configurable: true
    });
    Stack.prototype.setConfig = function (config) {
        var _this = this;
        this.windows = [];
        var windowPromise;
        if (config && config.windows && config.windows.length > 0) {
            windowPromise = Promise.all(config.windows.map(function (wc) {
                var w = new Window_1.Window();
                _this.add(w, false);
                return w.setConfig(wc);
            }));
        }
        else {
            windowPromise = Promise.resolve();
        }
        return windowPromise.then(mobx_1.action(function () {
            _this.setActiveIndex(config && !isNaN(config.activeIndex) ? config.activeIndex : 0);
            _this.setCloseDisabled(config ? config.closeDisabled : undefined);
        }));
    };
    Stack.prototype.remove = function (node) {
        var idx = this.windows.indexOf(node);
        if (idx >= 0) {
            var w = this.windows[idx];
            w.parent = undefined;
            this.windows.splice(idx, 1);
            if (this.windows.length === 0) {
                this.removeFromParent();
            }
            else if (this.windows.length > 0) {
                if (this.activeIndex >= this.windows.length) {
                    this.setActiveIndex(this.windows.length - 1);
                }
            }
        }
    };
    Stack.prototype._visitChildren = function (callback) {
        this.windows.forEach(function (w) { return w.visit(callback); });
    };
    Stack.prototype._findFirstChild = function (predicate) {
        var r;
        this.windows.some(function (w) {
            r = w.findFirst(predicate);
            return r ? true : false;
        });
        return r;
    };
    Stack.prototype._findAllChildren = function (predicate) {
        var r = [];
        var wr;
        this.windows.forEach(function (w) {
            wr = w.findAll(predicate);
            if (wr && wr.length > 0) {
                r = r.concat(wr);
            }
        });
        return r;
    };
    Stack.prototype.close = function () {
        this.unmount();
        this.removeFromParent();
    };
    Stack.prototype.unmount = function () {
        this.windows.forEach(function (w) { return w.unmount(); });
    };
    __decorate([
        mobx_1.observable
    ], Stack.prototype, "_closeDisabled", void 0);
    __decorate([
        mobx_1.observable
    ], Stack.prototype, "_activeIndex", void 0);
    __decorate([
        mobx_1.observable
    ], Stack.prototype, "windows", void 0);
    __decorate([
        mobx_1.computed
    ], Stack.prototype, "windowCount", null);
    __decorate([
        mobx_1.computed
    ], Stack.prototype, "closeDisabled", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "setCloseDisabled", null);
    __decorate([
        mobx_1.computed
    ], Stack.prototype, "activeIndex", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "setActiveIndex", null);
    __decorate([
        mobx_1.computed
    ], Stack.prototype, "first", null);
    __decorate([
        mobx_1.computed
    ], Stack.prototype, "last", null);
    __decorate([
        mobx_1.computed
    ], Stack.prototype, "active", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "setActive", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "add", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "open", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "addNew", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "insertAt", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "dropWindow", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "splitLeft", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "splitRight", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "splitTop", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "splitBottom", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "insertBefore", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "replace", null);
    __decorate([
        mobx_1.computed
    ], Stack.prototype, "config", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "setConfig", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "remove", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "_replaceWithListModuleLoaded", void 0);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "close", null);
    __decorate([
        mobx_1.action
    ], Stack.prototype, "unmount", null);
    return Stack;
}(Component_1.Component));
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map