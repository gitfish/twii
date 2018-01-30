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
var Dashboard_1 = require("../Dashboard");
var Dashboard_2 = require("./Dashboard");
var DashboardWrapper = /** @class */ (function (_super) {
    __extends(DashboardWrapper, _super);
    function DashboardWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.dashboard = new Dashboard_1.Dashboard();
        _this._setFromProps(_this.props);
        return _this;
    }
    DashboardWrapper.prototype._setFromProps = function (props) {
        this.dashboard.addApplet = props.addApplet;
        this.dashboard.setConfig(props.config);
        this.dashboard.loader = props.loader;
        this.dashboard.saver = props.saver;
        this.dashboard.saveDelay = props.saveDelay;
    };
    DashboardWrapper.prototype.componentWillReceiveProps = function (nextProps) {
        this.dashboard.unmount();
        this._setFromProps(nextProps);
    };
    DashboardWrapper.prototype.componentWillMount = function () {
        if (this.props.loader) {
            this.dashboard.load();
        }
    };
    DashboardWrapper.prototype.componentWillUnmount = function () {
        this.dashboard.unmount();
    };
    DashboardWrapper.prototype.render = function () {
        return React.createElement(Dashboard_2.DashboardContainer, { className: this.props.className, dashboard: this.dashboard, host: this.props.host, styles: this.props.styles });
    };
    return DashboardWrapper;
}(React.Component));
exports.DashboardWrapper = DashboardWrapper;
//# sourceMappingURL=DashboardWrapper.js.map