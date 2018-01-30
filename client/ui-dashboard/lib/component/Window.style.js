"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_styles_1 = require("@uifabric/merge-styles");
var styling_1 = require("@uifabric/styling");
var portal = {
    backgroundColor: styling_1.DefaultPalette.white,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "auto"
};
exports.portal = portal;
var merged;
var getMerged = function () {
    if (!merged) {
        merged = merge_styles_1.mergeStyleSets({
            portal: portal
        });
    }
    return merged;
};
var ClassNames = {
    get portal() {
        return getMerged().portal;
    }
};
exports.ClassNames = ClassNames;
//# sourceMappingURL=Window.style.js.map