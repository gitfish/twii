"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styling_1 = require("@uifabric/styling");
var utilities_1 = require("@uifabric/utilities");
var getStyles = utilities_1.memoizeFunction(function (theme, customStyles) {
    if (!theme) {
        theme = styling_1.getTheme();
    }
    var DefaultStyles = {
        root: {}
    };
    return styling_1.concatStyleSets(DefaultStyles, customStyles);
});
exports.getStyles = getStyles;
//# sourceMappingURL=Dashboard.styles.js.map