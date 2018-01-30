"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = require("@twii/core/lib/common/Context");
var ComponentViewFactory_1 = require("./ComponentViewFactory");
var createDefaultViewFactory = function () {
    var viewFactory = new ComponentViewFactory_1.ComponentViewFactory();
    // register our defaults
    return viewFactory;
};
var ComponentViewFactoryContext = new Context_1.Context({
    factory: createDefaultViewFactory
});
exports.ComponentViewFactoryContext = ComponentViewFactoryContext;
//# sourceMappingURL=ComponentViewFactoryContext.js.map