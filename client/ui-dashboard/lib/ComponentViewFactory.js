"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentViewFactory = /** @class */ (function () {
    function ComponentViewFactory() {
        this._typeFactoryMap = {};
    }
    ComponentViewFactory.prototype.registerTypeFactory = function (type, factory) {
        if (type && factory) {
            this._typeFactoryMap[type] = factory;
        }
    };
    ComponentViewFactory.prototype.createView = function (props) {
        var factory = this._typeFactoryMap[props.type];
        if (factory) {
            return factory.createView(props);
        }
        return null;
    };
    return ComponentViewFactory;
}());
exports.ComponentViewFactory = ComponentViewFactory;
//# sourceMappingURL=ComponentViewFactory.js.map