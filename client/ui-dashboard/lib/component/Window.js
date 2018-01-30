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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var DOMHelper_1 = require("../DOMHelper");
var AppHost_1 = require("@twii/ui-core/lib/app/component/AppHost");
var Window_style_1 = require("./Window.style");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var WindowPortal = /** @class */ (function (_super) {
    __extends(WindowPortal, _super);
    function WindowPortal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onRef = function (ref) {
            _this._ref = ref;
            if (_this._ref) {
                DOMHelper_1.setSingleChild(_this._ref, _this.props.window.el);
            }
        };
        return _this;
    }
    WindowPortal.prototype.componentWillReceiveProps = function (nextProps) {
        if (this._ref) {
            DOMHelper_1.setSingleChild(this._ref, nextProps.window.el);
        }
    };
    WindowPortal.prototype._resize = function () {
        this.props.window.emit({ type: "resize" });
    };
    WindowPortal.prototype._renderPortal = function () {
        var _this = this;
        if (this.props.window.el.children.length === 0) {
            this.props.window.unmountHandler = function () {
                ReactDOM.unmountComponentAtNode(_this.props.window.el);
            };
            return new Promise(function (resolve, reject) {
                ReactDOM.render(React.createElement(AppHost_1.AppHostContainer, { host: _this.props.window.appHost }), _this.props.window.el, function () {
                    resolve();
                });
            });
        }
        return Promise.resolve();
    };
    WindowPortal.prototype.componentDidMount = function () {
        var _this = this;
        this._renderPortal().then(function () {
            _this._resize();
        });
    };
    WindowPortal.prototype.render = function () {
        return (React.createElement("div", { className: Utilities_1.css(Window_style_1.ClassNames.portal, "window-portal", this.props.className), ref: this._onRef }));
    };
    WindowPortal.prototype.componentDidUpdate = function () {
        this._resize();
    };
    return WindowPortal;
}(React.Component));
exports.WindowPortal = WindowPortal;
//# sourceMappingURL=Window.js.map