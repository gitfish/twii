"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_styles_1 = require("@uifabric/merge-styles");
var paneMargin = 5;
var root = {};
exports.root = root;
var splitter = {
    selectors: {
        "&.hsplit-splitter": {
            cursor: "ew-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        "&.vsplit-splitter": {
            cursor: "ns-resize"
        }
    }
};
var topContainer = {
    selectors: {
        "$bottomPane": {
            bottom: 0
        },
        "$leftPane": {
            bottom: 0
        },
        "$rightPane": {
            bottom: 0
        }
    }
};
var topPane = {
    position: "absolute",
    left: paneMargin,
    top: paneMargin,
    bottom: 0,
    right: paneMargin,
    boxShadow: "0 0 " + paneMargin + "px 0 rgba(0, 0, 0, 0.4)",
    selectors: {
        ".pane &": {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            boxShadow: "none"
        }
    }
};
var leftContainer = {
    selectors: {
        "$rightPane": {
            right: 0
        },
        "$topPane": {
            right: 0
        },
        "$bottomPane": {
            right: 0
        }
    }
};
exports.leftContainer = leftContainer;
var leftPane = {
    position: "absolute",
    left: paneMargin,
    top: paneMargin,
    bottom: paneMargin,
    right: 0,
    boxShadow: "0 0 " + paneMargin + "px 0 rgba(0, 0, 0, 0.4)",
    selectors: {
        ".pane &": {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            boxShadow: "none"
        }
    }
};
var rightContainer = {
    selectors: {
        "$leftPane": {
            left: 0
        },
        "$topPane": {
            left: 0
        },
        "$bottomPane": {
            left: 0
        }
    }
};
exports.rightContainer = rightContainer;
var rightPane = {
    position: "absolute",
    left: 0,
    top: paneMargin,
    bottom: paneMargin,
    right: paneMargin,
    boxShadow: "0 0 " + paneMargin + "px 0 rgba(0, 0, 0, 0.4)",
    selectors: {
        ".pane &": {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            boxShadow: "none"
        }
    }
};
var bottomContainer = {
    selectors: {
        "$topPane": {
            top: 0
        },
        "$rightPane": {
            top: 0
        },
        "$leftPane": {
            top: 0
        }
    }
};
var bottomPane = {
    position: "absolute",
    left: paneMargin,
    top: 0,
    bottom: paneMargin,
    right: paneMargin,
    boxShadow: "0 0 " + paneMargin + "px 0 rgba(0, 0, 0, 0.4)",
    selectors: {
        ".pane &": {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            boxShadow: "none"
        }
    }
};
var merged;
var getMerged = function () {
    if (!merged) {
        merged = merge_styles_1.mergeStyleSets({
            root: root,
            splitter: splitter,
            topContainer: topContainer,
            topPane: topPane,
            leftContainer: leftContainer,
            leftPane: leftPane,
            rightContainer: rightContainer,
            rightPane: rightPane,
            bottomContainer: bottomContainer,
            bottomPane: bottomPane
        });
    }
    return merged;
};
var ClassNames = {
    get root() {
        return getMerged().root;
    },
    get splitter() {
        return getMerged().splitter;
    },
    get topContainer() {
        return getMerged().topContainer;
    },
    get topPane() {
        return getMerged().topPane;
    },
    get leftContainer() {
        return getMerged().leftContainer;
    },
    get leftPane() {
        return getMerged().leftPane;
    },
    get rightContainer() {
        return getMerged().rightContainer;
    },
    get rightPane() {
        return getMerged().rightPane;
    },
    get bottomContainer() {
        return getMerged().bottomContainer;
    },
    get bottomPane() {
        return getMerged().bottomPane;
    }
};
exports.ClassNames = ClassNames;
//# sourceMappingURL=Split.style.js.map