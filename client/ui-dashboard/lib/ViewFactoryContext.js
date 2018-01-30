"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = require("@twii/core/lib/common/Context");
var ViewFactory_1 = require("./ViewFactory");
var createDefaultViewFactory = function () {
    var viewFactory = new ViewFactory_1.ViewFactory();
    // register our defaults
    return viewFactory;
};
var ViewFactoryContext = new Context_1.Context({
    factory: createDefaultViewFactory
});
exports.ViewFactoryContext = ViewFactoryContext;
//# sourceMappingURL=ViewFactoryContext.js.map