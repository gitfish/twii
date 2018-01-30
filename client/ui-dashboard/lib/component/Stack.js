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
var ComponentActions_1 = require("../ComponentActions");
var Icon_1 = require("office-ui-fabric-react/lib/Icon");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Stack_styles_1 = require("./Stack.styles");
var Stack_classNames_1 = require("./Stack.classNames");
var WindowPortal_1 = require("./WindowPortal");
var StackCloseAction = /** @class */ (function (_super) {
    __extends(StackCloseAction, _super);
    function StackCloseAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onRemoveConfirm = function () {
            _this.props.stack.close();
        };
        _this._onClick = function () {
            if (_this.props.stack.windowCount > 1) {
                ComponentActions_1.removeComponent({ component: _this.props.stack, saveHandler: _this._onRemoveConfirm });
            }
            else {
                _this.props.stack.close();
            }
        };
        return _this;
    }
    StackCloseAction.prototype.render = function () {
        if (!this.props.stack.closeDisabled) {
            return (React.createElement("button", { type: "button", className: Utilities_1.css(this.props.classNames.action, "close-action"), title: "Close all Widgets", onClick: this._onClick },
                React.createElement(Icon_1.Icon, { iconName: "ChromeClose" })));
        }
        return null;
    };
    StackCloseAction = __decorate([
        mobx_react_1.observer
    ], StackCloseAction);
    return StackCloseAction;
}(React.Component));
var StackActionBar = /** @class */ (function (_super) {
    __extends(StackActionBar, _super);
    function StackActionBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackActionBar.prototype.render = function () {
        return (React.createElement("div", { className: this.props.classNames.actionBar, style: { position: "absolute", top: 0, right: 0, bottom: 0 } },
            React.createElement(StackCloseAction, __assign({}, this.props))));
    };
    StackActionBar = __decorate([
        mobx_react_1.observer
    ], StackActionBar);
    return StackActionBar;
}(React.Component));
var StackTabTitle = /** @class */ (function (_super) {
    __extends(StackTabTitle, _super);
    function StackTabTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackTabTitle.prototype.render = function () {
        return (React.createElement("div", { className: this.props.classNames.tabTitleContainer },
            React.createElement("div", { className: this.props.classNames.tabTitle }, this.props.window.title)));
    };
    StackTabTitle = __decorate([
        mobx_react_1.observer
    ], StackTabTitle);
    return StackTabTitle;
}(React.Component));
var StackTabCloseAction = /** @class */ (function (_super) {
    __extends(StackTabCloseAction, _super);
    function StackTabCloseAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onMouseDown = function (e) {
            e.stopPropagation();
        };
        _this._onClick = function (e) {
            e.stopPropagation();
            _this.props.window.close();
        };
        return _this;
    }
    StackTabCloseAction.prototype.render = function () {
        if (this.props.window && !this.props.window.closeDisabled) {
            return (React.createElement("button", { type: "button", className: Utilities_1.css(this.props.classNames.tabAction, "close-action"), title: "Close " + (this.props.window.title || "Widget"), onMouseDown: this._onMouseDown, onClick: this._onClick },
                React.createElement(Icon_1.Icon, { className: "stack-tab-action-icon", iconName: "ChromeClose" })));
        }
        return null;
    };
    StackTabCloseAction = __decorate([
        mobx_react_1.observer
    ], StackTabCloseAction);
    return StackTabCloseAction;
}(React.Component));
var StackTabActionBar = /** @class */ (function (_super) {
    __extends(StackTabActionBar, _super);
    function StackTabActionBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackTabActionBar.prototype.render = function () {
        return (React.createElement("div", { className: this.props.classNames.tabActionBar },
            React.createElement(StackTabCloseAction, __assign({}, this.props))));
    };
    return StackTabActionBar;
}(React.Component));
var StackTab = /** @class */ (function (_super) {
    __extends(StackTab, _super);
    function StackTab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onClick = function () {
            _this.props.stack.setActive(_this.props.window);
        };
        _this._onDragStart = function (e) {
            var db = _this.props.stack.dashboard;
            if (db) {
                e.stopPropagation();
                var transferText = String(JSON.stringify(_this.props.window.config));
                e.dataTransfer.setData("text", transferText);
                window.setTimeout(function () {
                    db.setDrag(_this.props.window);
                }, 1);
            }
        };
        _this._onDragEnd = function (e) {
            delete _this._dragOverStart;
            var db = _this.props.stack.dashboard;
            if (db) {
                db.clearDrag();
            }
        };
        _this._onDragOver = function (e) {
            var db = _this.props.stack.dashboard;
            var drag = db ? db.drag : undefined;
            if (drag) {
                e.stopPropagation();
                if (drag !== _this.props.window) {
                    e.preventDefault();
                    try {
                        e.dataTransfer.dropEffect = "move";
                    }
                    catch (ex) { }
                }
            }
            else {
                if (!_this.props.window.active) {
                    if (!_this._dragOverStart) {
                        _this._dragOverStart = new Date().getTime();
                    }
                    else {
                        var diff = new Date().getTime() - _this._dragOverStart;
                        if (diff >= 600) {
                            _this.props.window.activate();
                            delete _this._dragOverStart;
                        }
                    }
                }
            }
        };
        _this._onDragLeave = function (e) {
            if (e.relatedTarget !== _this._ref && !_this._ref.contains(e.relatedTarget)) {
                delete _this._dragOverStart;
            }
        };
        _this._onDrop = function (e) {
            delete _this._dragOverStart;
            e.stopPropagation();
            e.preventDefault();
            _this.props.stack.dropWindow(_this.props.window);
        };
        _this._onRef = function (ref) {
            _this._ref = ref;
        };
        return _this;
    }
    StackTab.prototype.render = function () {
        return (React.createElement("div", { className: Utilities_1.css(this.props.classNames.tab, { active: this.props.window.active, first: this.props.first }), role: "tab", id: this.props.window.id + "-tab", "aria-controls": this.props.window.id + "-tab-panel", title: this.props.window.title, ref: this._onRef, onClick: this._onClick, draggable: true, onDragStart: this._onDragStart, onDragEnd: this._onDragEnd, onDragOver: this._onDragOver, onDrop: this._onDrop, onDragLeave: this._onDragLeave },
            React.createElement(StackTabTitle, __assign({}, this.props)),
            React.createElement(StackTabActionBar, __assign({}, this.props))));
    };
    StackTab = __decorate([
        mobx_react_1.observer
    ], StackTab);
    return StackTab;
}(React.Component));
var StackTabPanel = /** @class */ (function (_super) {
    __extends(StackTabPanel, _super);
    function StackTabPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackTabPanel.prototype.render = function () {
        var active = this.props.window.active;
        var style = {
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden"
        };
        if (active) {
            style.right = 0;
            style.bottom = 0;
        }
        else {
            style.width = 0;
            style.height = 0;
        }
        return (React.createElement("div", { className: Utilities_1.css(this.props.classNames.tabPanel, { active: active }), style: style, role: "tabpanel", id: this.props.window.id + "-tab-panel" },
            React.createElement(WindowPortal_1.ProjectedWindowPortal, { window: this.props.window, className: "stack-window-portal" })));
    };
    StackTabPanel = __decorate([
        mobx_react_1.observer
    ], StackTabPanel);
    return StackTabPanel;
}(React.Component));
var StackAddAction = /** @class */ (function (_super) {
    __extends(StackAddAction, _super);
    function StackAddAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onClick = function () {
            _this.props.stack.addNew();
        };
        return _this;
    }
    StackAddAction.prototype.render = function () {
        if (this.props.stack.addApplet) {
            return (React.createElement("button", { type: "button", title: "Add Widget", className: this.props.classNames.addAction, onClick: this._onClick },
                React.createElement(Icon_1.Icon, { className: "stack-add-action-icon", iconName: "Add" })));
        }
        return null;
    };
    StackAddAction = __decorate([
        mobx_react_1.observer
    ], StackAddAction);
    return StackAddAction;
}(React.Component));
var StackTabBar = /** @class */ (function (_super) {
    __extends(StackTabBar, _super);
    function StackTabBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onDragOver = function (e) {
            var stack = _this.props.stack;
            var db = stack.dashboard;
            var drag = db ? db.drag : undefined;
            if (drag && (drag.parent !== stack || (stack.windowCount > 1 && drag !== stack.last))) {
                e.stopPropagation();
                e.preventDefault();
                try {
                    e.dataTransfer.dropEffect = "move";
                }
                catch (ex) { }
            }
        };
        _this._onDrop = function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.props.stack.dropWindow();
        };
        return _this;
    }
    StackTabBar.prototype.render = function () {
        var _this = this;
        var tabs = this.props.stack.windows.map(function (w, idx) {
            return React.createElement(StackTab, { key: w.id, stack: _this.props.stack, window: w, classNames: _this.props.classNames, first: idx === 0 });
        });
        return (React.createElement("div", { className: this.props.classNames.tabBar, onDragOver: this._onDragOver, onDrop: this._onDrop },
            tabs,
            React.createElement(StackAddAction, __assign({}, this.props))));
    };
    StackTabBar = __decorate([
        mobx_react_1.observer
    ], StackTabBar);
    return StackTabBar;
}(React.Component));
var StackHeader = /** @class */ (function (_super) {
    __extends(StackHeader, _super);
    function StackHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackHeader.prototype.render = function () {
        return (React.createElement("div", { className: this.props.classNames.header },
            React.createElement(StackTabBar, __assign({}, this.props)),
            React.createElement(StackActionBar, __assign({}, this.props))));
    };
    return StackHeader;
}(React.Component));
var uselessDropHandler = function () { };
var StackDragOverlay = /** @class */ (function (_super) {
    __extends(StackDragOverlay, _super);
    function StackDragOverlay(props) {
        var _this = _super.call(this, props) || this;
        _this._onDragLeave = function (e) {
            _this._dropHandler = uselessDropHandler;
            _this.setState({
                feedbackStyle: {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                }
            });
        };
        _this._onDrop = function (e) {
            e.preventDefault();
            _this._dropHandler();
            _this.props.stack.dashboard.clearDrag();
        };
        _this._dropHandler = uselessDropHandler;
        _this._dropLeft = function () {
            _this.props.stack.splitLeft(_this.props.stack.dashboard.drag);
        };
        _this._dropRight = function () {
            _this.props.stack.splitRight(_this.props.stack.dashboard.drag);
        };
        _this._dropTop = function () {
            _this.props.stack.splitTop(_this.props.stack.dashboard.drag);
        };
        _this._dropBottom = function () {
            _this.props.stack.splitBottom(_this.props.stack.dashboard.drag);
        };
        _this._dropAdd = function () {
            _this.props.stack.add(_this.props.stack.dashboard.drag);
        };
        _this._onDragOver = function (e) {
            var stack = _this.props.stack;
            var db = stack.dashboard;
            var drag = db ? db.drag : undefined;
            if (drag) {
                e.stopPropagation();
                if ((drag.parent !== stack && stack.windowCount > 0) || stack.windowCount > 1) {
                    e.preventDefault();
                    var bounds = _this._overlayRef.getBoundingClientRect();
                    var leftRightZoneWidth = Math.floor(bounds.width / 6);
                    var topBottomZoneHeight = Math.floor(bounds.height / 2);
                    var width = bounds.width;
                    if (e.clientX >= bounds.left && e.clientX <= bounds.left + leftRightZoneWidth) {
                        _this._setDropZoneLeft();
                    }
                    else if (e.clientX >= bounds.left + bounds.width - leftRightZoneWidth && e.clientX <= bounds.left + bounds.width) {
                        _this._setDropZoneRight();
                    }
                    else if (e.clientY >= bounds.top && e.clientY <= bounds.top + topBottomZoneHeight) {
                        _this._setDropZoneTop();
                    }
                    else {
                        _this._setDropZoneBottom();
                    }
                }
                else if (stack.windowCount === 0) {
                    e.preventDefault();
                    _this._setDropZoneAdd();
                }
            }
        };
        _this._onOverlayRef = function (ref) {
            _this._overlayRef = ref;
        };
        _this._onFeedbackRef = function (ref) {
            _this._feedbackRef = ref;
        };
        _this.state = {
            feedbackStyle: {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            }
        };
        return _this;
    }
    StackDragOverlay.prototype._setDropZoneLeft = function () {
        var ob = this._overlayRef.getBoundingClientRect();
        var width = Math.floor(ob.width / 2);
        this._dropHandler = this._dropLeft;
        this.setState({
            feedbackStyle: {
                top: 0,
                right: ob.width - width,
                left: 0,
                bottom: 0,
                width: width,
                height: ob.height
            }
        });
    };
    StackDragOverlay.prototype._setDropZoneRight = function () {
        var ob = this._overlayRef.getBoundingClientRect();
        var width = Math.floor(ob.width / 2);
        this._dropHandler = this._dropRight;
        this.setState({
            feedbackStyle: {
                top: 0,
                right: 0,
                bottom: 0,
                left: ob.width - width,
                width: width,
                height: ob.height
            }
        });
    };
    StackDragOverlay.prototype._setDropZoneTop = function () {
        var ob = this._overlayRef.getBoundingClientRect();
        var height = Math.floor(ob.height / 2);
        this._dropHandler = this._dropTop;
        this.setState({
            feedbackStyle: {
                top: 0,
                right: 0,
                bottom: ob.height - height,
                left: 0,
                width: ob.width,
                height: height
            }
        });
    };
    StackDragOverlay.prototype._setDropZoneBottom = function () {
        var ob = this._overlayRef.getBoundingClientRect();
        var height = Math.floor(ob.height / 2);
        this._dropHandler = this._dropBottom;
        this.setState({
            feedbackStyle: {
                top: ob.height - height,
                bottom: 0,
                left: 0,
                right: 0,
                width: ob.width,
                height: height
            }
        });
    };
    StackDragOverlay.prototype._setDropZoneAdd = function () {
        this._dropHandler = this._dropAdd;
    };
    StackDragOverlay.prototype.render = function () {
        if (this.props.stack.dashboard && this.props.stack.dashboard.drag) {
            return [
                React.createElement("div", { key: "feedback", className: this.props.classNames.dragOverlayFeedback, ref: this._onFeedbackRef, style: Object.assign({}, this.state.feedbackStyle, { position: "absolute", zIndex: 2 }) }),
                React.createElement("div", { key: "overlay", className: this.props.classNames.dragOverlay, onDragOver: this._onDragOver, onDrop: this._onDrop, onDragLeave: this._onDragLeave, ref: this._onOverlayRef, style: { position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 3 } })
            ];
        }
        return null;
    };
    StackDragOverlay = __decorate([
        mobx_react_1.observer
    ], StackDragOverlay);
    return StackDragOverlay;
}(React.Component));
var StackBody = /** @class */ (function (_super) {
    __extends(StackBody, _super);
    function StackBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackBody.prototype.render = function () {
        var _this = this;
        var panels = this.props.stack.windows.map(function (w) {
            return React.createElement(StackTabPanel, { key: w.id, stack: _this.props.stack, window: w, classNames: _this.props.classNames });
        });
        return (React.createElement("div", { className: this.props.classNames.body },
            React.createElement(StackDragOverlay, __assign({}, this.props)),
            panels));
    };
    StackBody = __decorate([
        mobx_react_1.observer
    ], StackBody);
    return StackBody;
}(React.Component));
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stack.prototype.render = function () {
        var classNames = this.props.classNames || Stack_classNames_1.getClassNames(Stack_styles_1.getStyles(null, this.props.styles), this.props.className);
        return (React.createElement("div", { id: this.props.stack.id, className: classNames.root },
            React.createElement(StackHeader, __assign({}, this.props, { classNames: classNames })),
            React.createElement(StackBody, __assign({}, this.props, { classNames: classNames }))));
    };
    return Stack;
}(React.Component));
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map