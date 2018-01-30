"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styling_1 = require("@uifabric/styling");
var utilities_1 = require("@uifabric/utilities");
var getClassNames = utilities_1.memoizeFunction(function (styles, className) {
    return {
        root: styling_1.mergeStyles("window-portal", className, styles.root)
    };
});
exports.getClassNames = getClassNames;
//# sourceMappingURL=WindowPortal.classNames.js.map