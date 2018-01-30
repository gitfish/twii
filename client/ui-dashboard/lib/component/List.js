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
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Icon_1 = require("office-ui-fabric-react/lib/Icon");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var List_style_1 = require("./List.style");
var WindowPortal_1 = require("./WindowPortal");
var ListCloseAction = /** @class */ (function (_super) {
    __extends(ListCloseAction, _super);
    function ListCloseAction() {
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
    ListCloseAction.prototype.render = function () {
        if (!this.props.stack.closeDisabled) {
            return React.createElement(Button_1.IconButton, { className: Utilities_1.css("list-action", "close-action"), title: "Close all Widgets", iconProps: { iconName: "ChromeClose" }, onClick: this._onClick });
        }
        return null;
    };
    ListCloseAction = __decorate([
        mobx_react_1.observer
    ], ListCloseAction);
    return ListCloseAction;
}(React.Component));
var ListAddAction = /** @class */ (function (_super) {
    __extends(ListAddAction, _super);
    function ListAddAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onClick = function () {
            _this.props.stack.addNew();
        };
        return _this;
    }
    ListAddAction.prototype.render = function () {
        if (this.props.stack.addApplet) {
            return React.createElement(Button_1.IconButton, { className: Utilities_1.css("list-action", "add-action"), title: "Add Widget", iconProps: { iconName: "Add" }, onClick: this._onClick });
        }
        return null;
    };
    ListAddAction = __decorate([
        mobx_react_1.observer
    ], ListAddAction);
    return ListAddAction;
}(React.Component));
var ListNearActionBar = /** @class */ (function (_super) {
    __extends(ListNearActionBar, _super);
    function ListNearActionBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListNearActionBar.prototype.render = function () {
        return (React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.nearActionBar, "list-near-action-bar") },
            React.createElement(ListAddAction, __assign({}, this.props))));
    };
    return ListNearActionBar;
}(React.Component));
var ListFarActionBar = /** @class */ (function (_super) {
    __extends(ListFarActionBar, _super);
    function ListFarActionBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListFarActionBar.prototype.render = function () {
        return (React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.farActionBar, "list-far-action-bar") },
            React.createElement(ListCloseAction, __assign({}, this.props))));
    };
    return ListFarActionBar;
}(React.Component));
var ListHeader = /** @class */ (function (_super) {
    __extends(ListHeader, _super);
    function ListHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onDragOver = function (e) {
            var db = _this.props.stack.dashboard;
            if (db && db.drag) {
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
            var s = _this.props.stack;
            s.dropWindow(s.windowCount > 0 ? s.windows[0] : undefined);
        };
        return _this;
    }
    ListHeader.prototype.render = function () {
        if (this.props.stack.addApplet || !this.props.stack.closeDisabled) {
            return (React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.header, "list-header"), onDragOver: this._onDragOver, onDrop: this._onDrop },
                React.createElement(ListNearActionBar, __assign({}, this.props)),
                React.createElement(ListFarActionBar, __assign({}, this.props))));
        }
        return null;
    };
    ListHeader = __decorate([
        mobx_react_1.observer
    ], ListHeader);
    return ListHeader;
}(React.Component));
var ListWindowTitle = /** @class */ (function (_super) {
    __extends(ListWindowTitle, _super);
    function ListWindowTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWindowTitle.prototype.render = function () {
        return (React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.windowTitleContainer, "list-window-title-container") },
            React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.windowTitle, "list-window-title") }, this.props.window.title)));
    };
    ListWindowTitle = __decorate([
        mobx_react_1.observer
    ], ListWindowTitle);
    return ListWindowTitle;
}(React.Component));
var ListWindowCloseAction = /** @class */ (function (_super) {
    __extends(ListWindowCloseAction, _super);
    function ListWindowCloseAction() {
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
    ListWindowCloseAction.prototype.render = function () {
        if (this.props.window && !this.props.window.closeDisabled) {
            return React.createElement(Button_1.IconButton, { className: Utilities_1.css("list-window-action", "close-action"), title: "Close " + (this.props.window.title || "Widget"), iconProps: { iconName: "ChromeClose" }, onMouseDown: this._onMouseDown, onClick: this._onClick });
        }
        return null;
    };
    ListWindowCloseAction = __decorate([
        mobx_react_1.observer
    ], ListWindowCloseAction);
    return ListWindowCloseAction;
}(React.Component));
var ListWindowToggleAction = /** @class */ (function (_super) {
    __extends(ListWindowToggleAction, _super);
    function ListWindowToggleAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onMouseDown = function (e) {
            e.stopPropagation();
        };
        _this._onClick = function (e) {
            e.stopPropagation();
            _this.props.window.toggleContent();
        };
        return _this;
    }
    ListWindowToggleAction.prototype.render = function () {
        return React.createElement(Button_1.IconButton, { className: Utilities_1.css("list-window-action", "toggle-action"), title: "Toggle " + (this.props.window.title || "Widget"), iconProps: { iconName: this.props.window.contentHidden ? "ChevronDown" : "ChevronUp" }, onMouseDown: this._onMouseDown, onClick: this._onClick });
    };
    ListWindowToggleAction = __decorate([
        mobx_react_1.observer
    ], ListWindowToggleAction);
    return ListWindowToggleAction;
}(React.Component));
var ListWindowActionBar = /** @class */ (function (_super) {
    __extends(ListWindowActionBar, _super);
    function ListWindowActionBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWindowActionBar.prototype.render = function () {
        return (React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.windowActionBar, "list-window-action-bar") },
            React.createElement(ListWindowToggleAction, __assign({}, this.props)),
            React.createElement(ListWindowCloseAction, __assign({}, this.props))));
    };
    return ListWindowActionBar;
}(React.Component));
var ListWindowHeader = /** @class */ (function (_super) {
    __extends(ListWindowHeader, _super);
    function ListWindowHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onMouseDown = function () {
            _this.props.stack.setActive(_this.props.window);
        };
        _this._onClick = function () {
            _this.props.window.toggleContent();
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
        };
        _this._onDrop = function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.props.stack.dropWindow(_this.props.window);
        };
        return _this;
    }
    ListWindowHeader.prototype.render = function () {
        return (React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.windowHeader, "window-header"), draggable: true, onMouseDown: this._onMouseDown, onClick: this._onClick, onDragStart: this._onDragStart, onDragEnd: this._onDragEnd, onDragOver: this._onDragOver, onDrop: this._onDrop },
            React.createElement(ListWindowTitle, __assign({}, this.props)),
            React.createElement(ListWindowActionBar, __assign({}, this.props))));
    };
    return ListWindowHeader;
}(React.Component));
var ListWindowBody = /** @class */ (function (_super) {
    __extends(ListWindowBody, _super);
    function ListWindowBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWindowBody.prototype.render = function () {
        return (React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.windowBody, "window-body", { "content-hidden": this.props.window.contentHidden }) },
            React.createElement(WindowPortal_1.ProjectedWindowPortal, { window: this.props.window, className: "list-window-portal", listenToPosition: true })));
    };
    ListWindowBody = __decorate([
        mobx_react_1.observer
    ], ListWindowBody);
    return ListWindowBody;
}(React.Component));
var ListWindow = /** @class */ (function (_super) {
    __extends(ListWindow, _super);
    function ListWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWindow.prototype.render = function () {
        var s;
        if (!this.props.window.contentHidden) {
            s = { height: this.props.height };
        }
        return (React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.window, "list-window", "pane", { "content-hidden": this.props.window.contentHidden }), style: s },
            React.createElement(ListWindowHeader, __assign({}, this.props)),
            React.createElement(ListWindowBody, __assign({}, this.props))));
    };
    ListWindow = __decorate([
        mobx_react_1.observer
    ], ListWindow);
    return ListWindow;
}(React.Component));
var ListAppender = /** @class */ (function (_super) {
    __extends(ListAppender, _super);
    function ListAppender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onClick = function () {
            _this.props.stack.addNew();
        };
        return _this;
    }
    ListAppender.prototype.render = function () {
        if (this.props.stack.addApplet) {
            return (React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.appender, "list-appender"), onClick: this._onClick },
                React.createElement(Icon_1.Icon, { iconName: "AddTo" })));
        }
        return null;
    };
    ListAppender = __decorate([
        mobx_react_1.observer
    ], ListAppender);
    return ListAppender;
}(React.Component));
var ListBody = /** @class */ (function (_super) {
    __extends(ListBody, _super);
    function ListBody(props) {
        var _this = _super.call(this, props) || this;
        _this._onDragOver = function (e) {
            var stack = _this.props.stack;
            var db = stack.dashboard;
            var drag = db ? db.drag : undefined;
            if (drag) {
                var isTarget = false;
                if (drag.parent !== stack) {
                    isTarget = true;
                }
                else {
                    var idx = stack.windows.indexOf(drag);
                    isTarget = idx < stack.windowCount - 1;
                }
                if (isTarget) {
                    e.stopPropagation();
                    e.preventDefault();
                    try {
                        e.dataTransfer.dropEffect = "move";
                    }
                    catch (ex) { }
                }
            }
        };
        _this._onDrop = function (e) {
            e.preventDefault();
            _this.props.stack.dropWindow();
        };
        _this._onResize = function () {
            if (_this._ref) {
                var bounds = _this._ref.getBoundingClientRect();
                if (bounds.height > 0) {
                    _this.setState({ windowHeight: Math.floor(bounds.height * 0.8) });
                }
            }
        };
        _this._onRef = function (ref) {
            _this._ref = ref;
        };
        _this.state = {
            windowHeight: 400
        };
        return _this;
    }
    ListBody.prototype.componentDidMount = function () {
        this.props.stack.addEventListener("resize", this._onResize);
        this._onResize();
    };
    ListBody.prototype.componentWilUnmount = function () {
        this.props.stack.removeEventListener("resize", this._onResize);
    };
    ListBody.prototype.render = function () {
        var _this = this;
        if (this.props.stack.windowCount > 0) {
            var wins = this.props.stack.windows.map(function (w) {
                return React.createElement(ListWindow, { key: w.id, stack: _this.props.stack, window: w, height: _this.state.windowHeight });
            });
            return (React.createElement("div", { className: Utilities_1.css(List_style_1.ClassNames.body, "list-body"), onDragOver: this._onDragOver, onDrop: this._onDrop, ref: this._onRef },
                wins,
                React.createElement(ListAppender, __assign({}, this.props))));
        }
        return null;
    };
    ListBody.prototype.componentDidUpdate = function () {
        this.props.stack.notifyResizeWindows();
    };
    ListBody = __decorate([
        mobx_react_1.observer
    ], ListBody);
    return ListBody;
}(React.Component));
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onScroll = function () {
            _this.props.stack.windows.forEach(function (w) { return w.emit({ type: "resize" }); });
        };
        return _this;
    }
    List.prototype.render = function () {
        return (React.createElement("div", { id: this.props.stack.id, className: Utilities_1.css(List_style_1.ClassNames.root, "List"), onScroll: this._onScroll },
            React.createElement(ListBody, __assign({}, this.props))));
    };
    return List;
}(React.Component));
exports.List = List;
//# sourceMappingURL=List.js.map