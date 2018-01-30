"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styling_1 = require("@uifabric/styling");
var utilities_1 = require("@uifabric/utilities");
var getClassNames = utilities_1.memoizeFunction(function (styles, className) {
    return {
        root: styling_1.mergeStyles(styles.root, className)
    };
});
exports.getClassNames = getClassNames;
//# sourceMappingURL=Dashboard.classNames.js.map