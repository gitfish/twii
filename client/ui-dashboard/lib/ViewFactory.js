"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewFactory = /** @class */ (function () {
    function ViewFactory() {
        this._typeFactoryMap = {};
    }
    ViewFactory.prototype.registerTypeFactory = function (type, factory) {
        if (type && factory) {
            this._typeFactoryMap[type] = factory;
        }
    };
    ViewFactory.prototype.createView = function (props) {
        var factory = this._typeFactoryMap[props.type];
        if (factory) {
            return factory.createView(props);
        }
        return null;
    };
    return ViewFactory;
}());
exports.ViewFactory = ViewFactory;
//# sourceMappingURL=ViewFactory.js.map