"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = require("@twii/core/lib/common/Context");
var TransientStorageService_1 = require("@twii/core/lib/common/service/TransientStorageService");
var LoggingStorageService_1 = require("@twii/core/lib/common/service/LoggingStorageService");
var DashboardStorageServiceContext = new Context_1.Context({
    factory: function () {
        return new LoggingStorageService_1.LoggingStorageService({ target: new TransientStorageService_1.TransientStorageService(), prefix: "transientStorage" });
    }
});
exports.DashboardStorageServiceContext = DashboardStorageServiceContext;
//# sourceMappingURL=DashboardStorageServiceContext.js.map