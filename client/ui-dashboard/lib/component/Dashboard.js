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
var ComponentFactory_1 = require("./ComponentFactory");
var Sync_1 = require("@twii/ui-core/lib/common/component/Sync");
var ComponentRemove_1 = require("./ComponentRemove");
var ComponentRemoveStore_1 = require("../ComponentRemoveStore");
var ComponentGlobals_1 = require("../ComponentGlobals");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Dashboard_styles_1 = require("./Dashboard.styles");
var Dashboard_classNames_1 = require("./Dashboard.classNames");
var DashboardBlockOverlay = /** @class */ (function (_super) {
    __extends(DashboardBlockOverlay, _super);
    function DashboardBlockOverlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashboardBlockOverlay.prototype.render = function () {
        if (this.props.dashboard && this.props.dashboard.blockSource) {
            var classNames = this.props.classNames;
            return (React.createElement("div", { className: Utilities_1.css(classNames ? classNames.overlay : undefined, this.props.dashboard.blockSource.type), style: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 2 } }));
        }
        return null;
    };
    DashboardBlockOverlay = __decorate([
        mobx_react_1.observer
    ], DashboardBlockOverlay);
    return DashboardBlockOverlay;
}(React.Component));
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onHostResize = function () {
            if (!ComponentGlobals_1.ComponentGlobals.ignoreResize) {
                _this.props.dashboard.emit({ type: "resize" });
            }
        };
        _this._onPortalRootRef = function (ref) {
            _this.props.dashboard.portalRoot = ref;
        };
        return _this;
    }
    Dashboard.prototype._addHostListener = function (host) {
        if (host) {
            host.addEventListener("resize", this._onHostResize);
        }
    };
    Dashboard.prototype._removeHostListener = function (host) {
        if (host) {
            host.removeEventListener("resize", this._onHostResize);
        }
    };
    Dashboard.prototype.componentDidMount = function () {
        this._addHostListener(this.props.host);
        this.props.dashboard.emit({ type: "resize" });
    };
    Dashboard.prototype.componentWillUnmount = function () {
        this._removeHostListener(this.props.host);
    };
    Dashboard.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.host !== this.props.host) {
            this._removeHostListener(this.props.host);
            this._addHostListener(nextProps.host);
        }
    };
    Dashboard.prototype.render = function () {
        var classNames = Dashboard_classNames_1.getClassNames(Dashboard_styles_1.getStyles(null, this.props.styles), this.props.className);
        var component = this.props.dashboard.component;
        var content = ComponentFactory_1.ComponentFactory(component);
        var style = this.props.hidden ? {
            position: "absolute",
            top: -1,
            left: -1,
            width: 0,
            height: 0,
            overflow: "hidden"
        } : {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        return (React.createElement("div", { id: this.props.dashboard.id, className: classNames.root, style: style },
            React.createElement(DashboardBlockOverlay, __assign({}, this.props, { classNames: classNames })),
            React.createElement(ComponentRemove_1.ComponentRemoveDialog, { remove: ComponentRemoveStore_1.ComponentRemoveStore }),
            React.createElement("div", { className: "dashboard-portal-root", ref: this._onPortalRootRef }),
            content));
    };
    Dashboard.prototype.componentDidUpdate = function () {
        this.props.dashboard.emit({ type: "resize" });
    };
    Dashboard = __decorate([
        mobx_react_1.observer
    ], Dashboard);
    return Dashboard;
}(React.Component));
exports.Dashboard = Dashboard;
var DashboardContainer = /** @class */ (function (_super) {
    __extends(DashboardContainer, _super);
    function DashboardContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onRenderDone = function () {
            return React.createElement(Dashboard, __assign({}, _this.props));
        };
        return _this;
    }
    DashboardContainer.prototype.render = function () {
        return React.createElement(Sync_1.Sync, { sync: this.props.dashboard.sync, syncLabel: "Loading Dashboard...", onRenderDone: this._onRenderDone });
    };
    return DashboardContainer;
}(React.Component));
exports.DashboardContainer = DashboardContainer;
//# sourceMappingURL=Dashboard.js.map