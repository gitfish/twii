"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styling_1 = require("@uifabric/styling");
var utilities_1 = require("@uifabric/utilities");
var getStyles = utilities_1.memoizeFunction(function (theme, customStyles) {
    if (!theme) {
        theme = styling_1.getTheme();
    }
    var DefaultStyles = {
        root: {
            backgroundColor: theme.palette.white,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        },
    };
    return styling_1.concatStyleSets(DefaultStyles, customStyles);
});
exports.getStyles = getStyles;
//# sourceMappingURL=WindowPortal.styles.js.map