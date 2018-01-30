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
var AppHost_1 = require("@twii/ui-core/lib/app/component/AppHost");
var WindowPortal_styles_1 = require("./WindowPortal.styles");
var WindowPortal_classNames_1 = require("./WindowPortal.classNames");
var DOMHelper_1 = require("../DOMHelper");
var ProjectedWindowPortal = /** @class */ (function (_super) {
    __extends(ProjectedWindowPortal, _super);
    function ProjectedWindowPortal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onRef = function (ref) {
            _this._ref = ref;
        };
        _this._projectPortal = function () {
            if (_this._ref) {
                // project the portal onto the container based on client bounds
                var portal = _this.props.window.portal;
                if (portal) {
                    var clientBounds = _this._ref.getBoundingClientRect();
                    var visible = clientBounds.height > 0 && clientBounds.width > 0;
                    var s = portal.style;
                    s.top = (visible ? clientBounds.top : -1) + "px";
                    s.left = (visible ? clientBounds.left : -1) + "px";
                    s.bottom = "";
                    s.right = "";
                    s.width = clientBounds.width + "px";
                    s.height = clientBounds.height + "px";
                    s.overflow = visible ? "auto" : "hidden";
                    if (visible) {
                        DOMHelper_1.dispatchWindowResize();
                    }
                }
            }
        };
        _this._addListeners = function (props) {
            props.window.addEventListener("resizeview", _this._projectPortal);
            if (props.listenToPosition) {
                props.window.addEventListener("positionview", _this._projectPortal);
            }
        };
        _this._removeListeners = function (props) {
            props.window.removeEventListener("resizeview", _this._projectPortal);
            if (props.listenToPosition) {
                props.window.removeEventListener("positionview", _this._projectPortal);
            }
        };
        return _this;
    }
    ProjectedWindowPortal.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.window !== this.props.window) {
            this._removeListeners(this.props);
        }
        if (nextProps.window) {
            this._addListeners(nextProps);
        }
        nextProps.window.emit({ type: "resize" });
    };
    ProjectedWindowPortal.prototype._renderApp = function () {
        var _this = this;
        var portal = this.props.window.portal;
        if (portal && portal.children.length === 0) {
            this.props.window.unmountHandler = function () {
                ReactDOM.unmountComponentAtNode(portal);
            };
            return new Promise(function (resolve, reject) {
                ReactDOM.render(React.createElement(AppHost_1.AppHostContainer, { host: _this.props.window.appHost }), portal, function () {
                    resolve();
                });
            });
        }
        return Promise.resolve();
    };
    ProjectedWindowPortal.prototype.componentDidMount = function () {
        this._addListeners(this.props);
        this._renderApp();
        this.props.window.emit({ type: "resize" });
    };
    ProjectedWindowPortal.prototype.componentWillUnmount = function () {
        this._removeListeners(this.props);
        var portal = this.props.window.portal;
        if (portal) {
            var s = portal.style;
            s.top = "-1px";
            s.left = "-1px";
            s.width = "0px";
            s.height = "0px";
        }
    };
    ProjectedWindowPortal.prototype.render = function () {
        var classNames = WindowPortal_classNames_1.getClassNames(WindowPortal_styles_1.getStyles(undefined, this.props.styles), this.props.className);
        return (React.createElement("div", { className: classNames.root, ref: this._onRef }));
    };
    ProjectedWindowPortal.prototype.componentDidUpdate = function () {
        this.props.window.emit({ type: "resize" });
    };
    return ProjectedWindowPortal;
}(React.Component));
exports.ProjectedWindowPortal = ProjectedWindowPortal;
//# sourceMappingURL=WindowPortal.js.map