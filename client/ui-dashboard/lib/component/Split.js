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
var mobx_1 = require("mobx");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var ComponentFactory_1 = require("./ComponentFactory");
var ComponentTypes_1 = require("../ComponentTypes");
var Split_style_1 = require("./Split.style");
var HSplit = /** @class */ (function (_super) {
    __extends(HSplit, _super);
    function HSplit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onDocumentMouseUp = function (e) {
            _this._ref.ownerDocument.removeEventListener("mousemove", _this._onDocumentMouseMove);
            _this._ref.ownerDocument.removeEventListener("mouseup", _this._onDocumentMouseUp);
            _this.props.hsplit.setSplitActive(false);
        };
        _this._onDocumentMouseMove = function (e) {
            e.preventDefault();
            _this._resize(e);
        };
        _this._onSplitterMouseDown = function (e) {
            e.preventDefault();
            _this._ref.ownerDocument.addEventListener("mousemove", _this._onDocumentMouseMove);
            _this._ref.ownerDocument.addEventListener("mouseup", _this._onDocumentMouseUp);
            _this.props.hsplit.setSplitActive(true);
        };
        _this._onRef = function (ref) {
            _this._ref = ref;
        };
        _this._onSplitterRef = function (ref) {
            _this._splitterRef = ref;
        };
        _this._onLeftPaneRef = function (ref) {
            _this._leftPaneRef = ref;
        };
        _this._onRightPaneRef = function (ref) {
            _this._rightPaneRef = ref;
        };
        _this._onResize = function () {
            var bounds = _this._ref.getBoundingClientRect();
            var splitterBounds = _this._splitterRef.getBoundingClientRect();
            var leftWidth = Math.floor(bounds.width * _this.props.hsplit.offset);
            var rightWidth = bounds.width - leftWidth - splitterBounds.width;
            _this._leftPaneRef.style.width = leftWidth + "px";
            _this._splitterRef.style.left = _this._leftPaneRef.style.width;
            _this._rightPaneRef.style.width = rightWidth + "px";
            if (_this.props.hsplit.left) {
                _this.props.hsplit.left.emit({ type: "resize" });
            }
            if (_this.props.hsplit.right) {
                _this.props.hsplit.right.emit({ type: "resize" });
            }
        };
        return _this;
    }
    HSplit.prototype._resize = function (e) {
        var minItemWidth = this.props.hsplit.minItemWidth;
        var bounds = this._ref.getBoundingClientRect();
        var splitterBounds = this._splitterRef.getBoundingClientRect();
        var max = bounds.width - splitterBounds.width - minItemWidth;
        var splitterPos = e.clientX - bounds.left;
        if (splitterPos <= minItemWidth) {
            splitterPos = minItemWidth;
        }
        else if (splitterPos >= max) {
            splitterPos = max;
        }
        var offset = splitterPos / bounds.width;
        this.props.hsplit.setOffset(offset);
    };
    HSplit.prototype.componentDidMount = function () {
        this._offsetReactionDisposer = mobx_1.autorun(this._onResize);
        this.props.hsplit.addEventListener("resize", this._onResize);
    };
    HSplit.prototype.componentWillUnmount = function () {
        if (this._offsetReactionDisposer) {
            this._offsetReactionDisposer();
            delete this._offsetReactionDisposer;
        }
        this.props.hsplit.removeEventListener("resize", this._onResize);
    };
    HSplit.prototype.render = function () {
        var left = this.props.hsplit.left;
        var right = this.props.hsplit.right;
        var leftContent = ComponentFactory_1.ComponentFactory(left);
        var rightContent = ComponentFactory_1.ComponentFactory(right);
        if (!ComponentTypes_1.isSplit(left)) {
            leftContent = (React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.leftPane, "pane hsplit-pane left-pane") }, leftContent));
        }
        if (!ComponentTypes_1.isSplit(right)) {
            rightContent = (React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.rightPane, "pane hsplit-pane right-pane") }, rightContent));
        }
        ;
        return (React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.root, "hsplit"), style: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }, ref: this._onRef },
            React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.leftContainer, "split-container", "hsplit-left-container"), ref: this._onLeftPaneRef, style: { position: "absolute", left: 0, top: 0, bottom: 0, width: "50%" } }, leftContent),
            React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.splitter, "hsplit-splitter", { active: this.props.hsplit.splitActive }), style: { position: "absolute", top: 0, bottom: 0, width: 5 }, onMouseDown: this._onSplitterMouseDown, ref: this._onSplitterRef },
                React.createElement("div", { className: "hsplit-splitter-content", style: { width: "100%", height: "100%" } })),
            React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.rightContainer, "split-container", "hsplit-right-container"), ref: this._onRightPaneRef, style: { position: "absolute", right: 0, top: 0, bottom: 0, width: "50%" } }, rightContent)));
    };
    HSplit = __decorate([
        mobx_react_1.observer
    ], HSplit);
    return HSplit;
}(React.Component));
exports.HSplit = HSplit;
var VSplit = /** @class */ (function (_super) {
    __extends(VSplit, _super);
    function VSplit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._resize = function (e) {
            var minItemHeight = _this.props.vsplit.minItemHeight;
            var bounds = _this._ref.getBoundingClientRect();
            var splitterBounds = _this._splitterRef.getBoundingClientRect();
            var max = bounds.height - splitterBounds.height - minItemHeight;
            var splitterPos = e.clientY - bounds.top;
            if (splitterPos <= minItemHeight) {
                splitterPos = minItemHeight;
            }
            else if (splitterPos >= max) {
                splitterPos = max;
            }
            var offset = splitterPos / bounds.height;
            _this.props.vsplit.setOffset(offset);
        };
        _this._onDocumentMouseUp = function (e) {
            _this._ref.ownerDocument.removeEventListener("mousemove", _this._onDocumentMouseMove);
            _this._ref.ownerDocument.removeEventListener("mouseup", _this._onDocumentMouseUp);
            _this.props.vsplit.setSplitActive(false);
        };
        _this._onDocumentMouseMove = function (e) {
            e.preventDefault();
            _this._resize(e);
        };
        _this._onSplitterMouseDown = function (e) {
            e.preventDefault();
            _this._ref.ownerDocument.addEventListener("mousemove", _this._onDocumentMouseMove);
            _this._ref.ownerDocument.addEventListener("mouseup", _this._onDocumentMouseUp);
            _this.props.vsplit.setSplitActive(true);
        };
        _this._onRef = function (ref) {
            _this._ref = ref;
        };
        _this._onSplitterRef = function (ref) {
            _this._splitterRef = ref;
        };
        _this._onTopPaneRef = function (ref) {
            _this._topPaneRef = ref;
        };
        _this._onBottomPaneRef = function (ref) {
            _this._bottomPaneRef = ref;
        };
        _this._onResize = function () {
            var bounds = _this._ref.getBoundingClientRect();
            var splitterBounds = _this._splitterRef.getBoundingClientRect();
            var topHeight = Math.floor(bounds.height * _this.props.vsplit.offset);
            var bottomHeight = bounds.height - topHeight - splitterBounds.height;
            _this._topPaneRef.style.height = topHeight + "px";
            _this._splitterRef.style.top = _this._topPaneRef.style.height;
            _this._bottomPaneRef.style.height = bottomHeight + "px";
            if (_this.props.vsplit.top) {
                _this.props.vsplit.top.emit({ type: "resize" });
            }
            if (_this.props.vsplit.bottom) {
                _this.props.vsplit.bottom.emit({ type: "resize" });
            }
        };
        return _this;
    }
    VSplit.prototype.componentDidMount = function () {
        this._offsetReactionDisposer = mobx_1.autorun(this._onResize);
        this.props.vsplit.addEventListener("resize", this._onResize);
    };
    VSplit.prototype.componentWillUnmount = function () {
        if (this._offsetReactionDisposer) {
            this._offsetReactionDisposer();
            delete this._offsetReactionDisposer;
        }
        this.props.vsplit.removeEventListener("resize", this._onResize);
    };
    VSplit.prototype.render = function () {
        var top = this.props.vsplit.top;
        var bottom = this.props.vsplit.bottom;
        var topContent = ComponentFactory_1.ComponentFactory(top);
        var bottomContent = ComponentFactory_1.ComponentFactory(bottom);
        if (!ComponentTypes_1.isSplit(top)) {
            topContent = (React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.topPane, "pane vsplit-pane top-pane") }, topContent));
        }
        if (!ComponentTypes_1.isSplit(bottom)) {
            bottomContent = (React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.bottomPane, "pane vsplit-pane bottom-pane") }, bottomContent));
        }
        ;
        return (React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.root, "vsplit"), style: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }, ref: this._onRef },
            React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.topContainer, "split-container", "vsplit-top-container"), ref: this._onTopPaneRef, style: { position: "absolute", left: 0, top: 0, right: 0, height: "50%" } }, topContent),
            React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.splitter, "vsplit-splitter", { active: this.props.vsplit.splitActive }), style: { position: "absolute", left: 0, right: 0, height: 5 }, onMouseDown: this._onSplitterMouseDown, ref: this._onSplitterRef },
                React.createElement("div", { className: "vsplit-splitter-content", style: { width: "100%", height: "100%" } })),
            React.createElement("div", { className: Utilities_1.css(Split_style_1.ClassNames.bottomContainer, "split-container", "vsplit-bottom-container"), ref: this._onBottomPaneRef, style: { position: "absolute", left: 0, bottom: 0, right: 0, height: "50%" } }, bottomContent)));
    };
    VSplit = __decorate([
        mobx_react_1.observer
    ], VSplit);
    return VSplit;
}(React.Component));
exports.VSplit = VSplit;
//# sourceMappingURL=Split.js.map