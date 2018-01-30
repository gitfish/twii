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
var SyncModel_1 = require("@twii/core/lib/common/model/SyncModel");
var ComponentFactoryRouter_1 = require("./ComponentFactoryRouter");
var ComponentTypes = require("./ComponentTypes");
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard() {
        var _this = _super.call(this) || this;
        _this.sync = new SyncModel_1.SyncModel();
        _this._saveDelay = 1000;
        _this._onResize = function () {
            if (_this._component) {
                _this._component.emit({ type: "resize" });
            }
        };
        _this._saveConfig = function (config) {
            _this.saver(config);
        };
        _this._loadDone = function (config) {
            return _this.setConfig(config).then(function () {
                if (_this.saver) {
                    _this._configSaveDisposer = mobx_1.reaction(function () {
                        return _this.config;
                    }, _this._saveConfig, { delay: _this.saveDelay });
                }
            });
        };
        _this._loadError = function (error) {
            console.error(error);
            return _this.setConfig(undefined).then(function () {
                _this.sync.syncError(error);
            });
        };
        _this._stackLayoutImpl = function (m) {
            // find all windows
            var windows = _this.findAll(function (c) { return c.type === "window"; });
            // find active
            var active = _this.findFirst(function (c) { return c.type === "window" && c.active; });
            var stack = new m.Stack();
            _this.setComponent(stack);
            windows.forEach(function (w) {
                stack.add(w, false);
            });
            if (active) {
                stack.setActive(active);
            }
            else {
                stack.setActiveIndex(0);
            }
        };
        _this._listLayoutImpl = function (m) {
            // find all windows
            var windows = _this.findAll(function (c) { return c.type === "window"; });
            // find active
            var active = _this.findFirst(function (c) { return c.type === "window" && c.active; });
            var list = new m.List();
            _this.setComponent(list);
            windows.forEach(function (w) {
                list.add(w, false);
            });
            if (active) {
                list.setActive(active);
            }
            else {
                list.setActiveIndex(0);
            }
        };
        _this._columnSplitLayout = function (handler) {
            var firstContainer = _this.findFirst(function (c) { return c.type === "list" || c.type === "stack"; });
            var colSplitType;
            var vsplitPromise = Promise.resolve().then(function () { return require("./Split"); }).then(function (m) {
                colSplitType = m.HSplit;
            });
            var containerType;
            var containerPromise = Promise.resolve().then(function () { return require("./Stack"); }).then(function (m) { return containerType = m.Stack; });
            return Promise.all([
                vsplitPromise,
                containerPromise
            ]).then(function () {
                handler(colSplitType, containerType);
            });
        };
        _this._twoColumnSplitlayoutImpl = function (ColSplit, Container) {
            var windows = _this.findAll(function (c) { return c.type === "window"; });
            // create the new containers
            var containers = [
                new Container(),
                new Container()
            ];
            var split = new ColSplit();
            split.setLeft(containers[0]);
            split.setRight(containers[1]);
            _this.setComponent(split);
            if (windows.length > 0) {
                var containerQuota_1 = Math.ceil(windows.length / containers.length);
                var containerIdx_1 = 0;
                var c_1;
                windows.forEach(function (w) {
                    c_1 = containers[containerIdx_1];
                    if (c_1.windowCount === containerQuota_1) {
                        containerIdx_1++;
                        c_1 = containers[containerIdx_1];
                    }
                    c_1.add(w, false);
                });
            }
            containers.forEach(function (c) {
                if (c.windowCount > 0) {
                    c.setActiveIndex(0);
                }
                else {
                    c.addNew();
                }
            });
        };
        // NOTE: need to create generic methods for column and row splitting by count
        _this._threeColumnSplitlayoutImpl = function (ColSplit, Container) {
            var windows = _this.findAll(function (c) { return c.type === "window"; });
            // create the new containers
            var containers = [
                new Container(),
                new Container(),
                new Container()
            ];
            var outerSplit = new ColSplit();
            outerSplit.setOffset(0.33);
            var innerSplit = new ColSplit();
            outerSplit.setLeft(containers[0]);
            outerSplit.setRight(innerSplit);
            innerSplit.setLeft(containers[1]);
            innerSplit.setRight(containers[2]);
            _this.setComponent(outerSplit);
            if (windows.length > 0) {
                var containerQuota_2 = Math.ceil(windows.length / containers.length);
                var containerIdx_2 = 0;
                var c_2;
                windows.forEach(function (w) {
                    c_2 = containers[containerIdx_2];
                    if (c_2.windowCount === containerQuota_2) {
                        containerIdx_2++;
                        c_2 = containers[containerIdx_2];
                    }
                    c_2.add(w, false);
                });
            }
            containers.forEach(function (c) {
                if (c.windowCount > 0) {
                    c.setActiveIndex(0);
                }
                else {
                    c.addNew();
                }
            });
        };
        _this.addEventListener("resize", _this._onResize);
        return _this;
    }
    Object.defineProperty(Dashboard.prototype, "type", {
        get: function () {
            return ComponentTypes.dashboard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "dashboardList", {
        get: function () {
            return this.parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "closeDisabled", {
        get: function () {
            return this._closeDisabled !== undefined ? this._closeDisabled : (this.dashboardList && this.dashboardList.closeDisabled);
        },
        set: function (value) {
            this.setCloseDisabled(value);
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.setCloseDisabled = function (closeDisabled) {
        this._closeDisabled = closeDisabled;
    };
    Object.defineProperty(Dashboard.prototype, "component", {
        get: function () {
            return this._component;
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.setComponent = function (component) {
        if (component !== this._component) {
            if (component && component.parent !== this) {
                component.removeFromParent();
            }
            this._component = component;
            if (this._component) {
                this._component.parent = this;
            }
        }
    };
    Object.defineProperty(Dashboard.prototype, "drag", {
        get: function () {
            return this._drag;
        },
        set: function (value) {
            this.setDrag(value);
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.setDrag = function (drag) {
        this._drag = drag;
    };
    Dashboard.prototype.clearDrag = function () {
        this._drag = undefined;
    };
    Object.defineProperty(Dashboard.prototype, "blockSource", {
        get: function () {
            return this._blockSource;
        },
        set: function (value) {
            this.setBlockSource(value);
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.setBlockSource = function (blockSource) {
        this._blockSource = blockSource;
    };
    Dashboard.prototype.clearBlockSource = function () {
        this._blockSource = undefined;
    };
    Object.defineProperty(Dashboard.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this.setTitle(value);
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.setTitle = function (title) {
        this._title = title;
    };
    Object.defineProperty(Dashboard.prototype, "dashboard", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "componentConfig", {
        get: function () {
            return this._component ? this._component.config : undefined;
        },
        set: function (config) {
            this.setComponentConfig(config);
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.setComponentConfig = function (config) {
        var _this = this;
        if (config) {
            return ComponentFactoryRouter_1.ComponentFactoryRouter.handleRequest({ path: config.type }).then(function (component) {
                _this.setComponent(component);
                return component.setConfig(config);
            });
        }
        this.setComponent(undefined);
        return Promise.resolve();
    };
    Object.defineProperty(Dashboard.prototype, "config", {
        get: function () {
            return {
                type: this.type,
                title: this.title,
                closeDisabled: this._closeDisabled,
                component: this.componentConfig
            };
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.setConfig = function (value) {
        var _this = this;
        this.setTitle(value ? value.title : undefined);
        this.setCloseDisabled(value ? value.closeDisabled : undefined);
        return this.setComponentConfig(value ? value.component : undefined).then(function () {
            _this.sync.syncEnd();
        });
    };
    Dashboard.prototype.remove = function (comp) {
        if (comp && this._component && comp === this._component) {
            this.setComponent(undefined);
            this.removeFromParent();
        }
    };
    Dashboard.prototype.replace = function (newComp, oldComp) {
        if (oldComp === this._component) {
            this.setComponent(newComp);
        }
    };
    Object.defineProperty(Dashboard.prototype, "saveDelay", {
        get: function () {
            return this._saveDelay;
        },
        set: function (value) {
            if (!isNaN(value) && value >= 0) {
                this._saveDelay = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.load = function () {
        if (this._configSaveDisposer) {
            this._configSaveDisposer();
            delete this._configSaveDisposer;
        }
        if (this.loader) {
            this.sync.syncStart();
            return Promise.resolve(this.loader()).then(this._loadDone).catch(this._loadError);
        }
        return Promise.reject({ code: "ILLEGAL_STATE", message: "A loader has not been configured" });
    };
    Dashboard.prototype.clear = function () {
        this.setComponent(undefined);
    };
    Object.defineProperty(Dashboard.prototype, "isStackLayout", {
        get: function () {
            return this.component && this.component.type === "stack";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "isListLayout", {
        get: function () {
            return this.component && this.component.type === "list";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "stackLayoutAvailable", {
        get: function () {
            return this.component && this.component.type !== "stack";
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.stackLayout = function () {
        if (this.stackLayoutAvailable) {
            return Promise.resolve().then(function () { return require("./Stack"); }).then(this._stackLayoutImpl);
        }
        return Promise.resolve();
    };
    Object.defineProperty(Dashboard.prototype, "listLayoutAvailable", {
        get: function () {
            return this.component && this.component.type !== "list";
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.listLayout = function () {
        if (this.listLayoutAvailable) {
            return Promise.resolve().then(function () { return require("./List"); }).then(this._listLayoutImpl);
        }
        return Promise.resolve();
    };
    Object.defineProperty(Dashboard.prototype, "isRowSplitLayout", {
        get: function () {
            return this.component && this.component.type === "vsplit";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "isColumnSplitLayout", {
        get: function () {
            return this.component && this.component.type === "hsplit";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "columnCount", {
        get: function () {
            return this.isColumnSplitLayout ? this.component.columnCount : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "isTwoColumnSplitLayout", {
        get: function () {
            return this.isColumnSplitLayout && this.columnCount === 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "twoColumnSplitLayoutAvailable", {
        get: function () {
            return this.component && (!this.isColumnSplitLayout || this.columnCount !== 2);
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.twoColumnSplitLayout = function () {
        if (this.twoColumnSplitLayoutAvailable) {
            this._columnSplitLayout(this._twoColumnSplitlayoutImpl);
        }
        return Promise.resolve();
    };
    Object.defineProperty(Dashboard.prototype, "isThreeColumnSplitLayout", {
        get: function () {
            return this.isColumnSplitLayout && this.columnCount === 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "threeColumnSplitLayoutAvailable", {
        get: function () {
            return this.component && (!this.isColumnSplitLayout || this.columnCount !== 3);
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.threeColumnSplitLayout = function () {
        if (this.threeColumnSplitLayoutAvailable) {
            this._columnSplitLayout(this._threeColumnSplitlayoutImpl);
        }
        return Promise.resolve();
    };
    Object.defineProperty(Dashboard.prototype, "isOtherLayout", {
        get: function () {
            return this.component &&
                !this.isStackLayout &&
                !this.isListLayout &&
                !this.isTwoColumnSplitLayout &&
                !this.isThreeColumnSplitLayout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "splittable", {
        get: function () {
            return this.isListLayout || this.isStackLayout;
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.splitLeft = function (newComp) {
        if (this.splittable) {
            return this.component.splitLeft(newComp);
        }
        return Promise.resolve();
    };
    Dashboard.prototype.splitRight = function (newComp) {
        if (this.splittable) {
            return this.component.splitRight(newComp);
        }
        return Promise.resolve();
    };
    Dashboard.prototype.splitTop = function (newComp) {
        if (this.splittable) {
            return this.component.splitTop(newComp);
        }
        return Promise.resolve();
    };
    Dashboard.prototype.splitBottom = function (newComp) {
        if (this.splittable) {
            return this.component.splitBottom(newComp);
        }
        return Promise.resolve();
    };
    Dashboard.prototype._visitChildren = function (callback) {
        if (this._component) {
            this._component.visit(callback);
        }
    };
    Dashboard.prototype._findFirstChild = function (predicate) {
        if (this._component) {
            return this._component.findFirst(predicate);
        }
    };
    Dashboard.prototype._findAllChildren = function (predicate) {
        if (this._component) {
            return this._component.findAll(predicate);
        }
    };
    Dashboard.prototype.unmount = function () {
        if (this._component) {
            this._component.unmount();
        }
        delete this._portalRoot;
    };
    Object.defineProperty(Dashboard.prototype, "portalRoot", {
        get: function () {
            return this._portalRoot;
        },
        set: function (portalRoot) {
            this._portalRoot = portalRoot;
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype._getPortalId = function (source) {
        return source.id + "-portal";
    };
    Dashboard.prototype.getPortal = function (source) {
        if (this.portalRoot) {
            var portalId = this._getPortalId(source);
            var el = document.getElementById(portalId);
            if (!el) {
                el = document.createElement("div");
                el.id = portalId;
                var s = el.style;
                s.position = "fixed";
                s.zIndex = "1";
                this.portalRoot.appendChild(el);
            }
            return el;
        }
    };
    Dashboard.prototype.destroyPortal = function (source) {
        var portalId = this._getPortalId(source);
        var el = document.getElementById(portalId);
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    };
    __decorate([
        mobx_1.observable
    ], Dashboard.prototype, "sync", void 0);
    __decorate([
        mobx_1.observable
    ], Dashboard.prototype, "_title", void 0);
    __decorate([
        mobx_1.observable
    ], Dashboard.prototype, "_closeDisabled", void 0);
    __decorate([
        mobx_1.observable
    ], Dashboard.prototype, "_component", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Dashboard.prototype, "_drag", void 0);
    __decorate([
        mobx_1.observable.ref
    ], Dashboard.prototype, "_blockSource", void 0);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "dashboardList", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "closeDisabled", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "setCloseDisabled", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "component", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "setComponent", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "drag", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "setDrag", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "clearDrag", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "blockSource", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "setBlockSource", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "clearBlockSource", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "title", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "setTitle", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "dashboard", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "componentConfig", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "setComponentConfig", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "config", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "setConfig", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "remove", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "replace", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "_loadDone", void 0);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "_loadError", void 0);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "load", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "clear", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "isStackLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "isListLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "stackLayoutAvailable", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "_stackLayoutImpl", void 0);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "stackLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "listLayoutAvailable", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "_listLayoutImpl", void 0);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "listLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "isRowSplitLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "isColumnSplitLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "columnCount", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "isTwoColumnSplitLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "twoColumnSplitLayoutAvailable", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "_columnSplitLayout", void 0);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "_twoColumnSplitlayoutImpl", void 0);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "twoColumnSplitLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "isThreeColumnSplitLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "threeColumnSplitLayoutAvailable", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "_threeColumnSplitlayoutImpl", void 0);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "threeColumnSplitLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "isOtherLayout", null);
    __decorate([
        mobx_1.computed
    ], Dashboard.prototype, "splittable", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "splitLeft", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "splitRight", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "splitTop", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "splitBottom", null);
    __decorate([
        mobx_1.action
    ], Dashboard.prototype, "unmount", null);
    return Dashboard;
}(Component_1.Component));
exports.Dashboard = Dashboard;
//# sourceMappingURL=Dashboard.js.map