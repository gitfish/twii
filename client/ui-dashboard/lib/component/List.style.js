"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_styles_1 = require("@uifabric/merge-styles");
var styling_1 = require("@uifabric/styling");
var root = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};
exports.root = root;
var headerHeight = 28;
var headerBorderHeight = 1;
var header = {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: headerHeight,
    backgroundColor: styling_1.DefaultPalette.neutralLight,
    color: styling_1.DefaultPalette.themeDarker,
    borderBottom: headerBorderHeight + "px solid " + styling_1.DefaultPalette.themeDarker
};
exports.header = header;
var tabPanel = {};
var action = {
    color: styling_1.DefaultPalette.themeDarker,
    selectors: {
        ".ms-Icon": {
            fontSize: styling_1.FontSizes.small,
            fontWeight: styling_1.FontWeights.regular
        },
        "& .close-action": {
            selectors: {
                ":hover": {
                    color: styling_1.DefaultPalette.white,
                    backgroundColor: styling_1.DefaultPalette.redDark
                }
            }
        }
    }
};
exports.action = action;
var nearActionBar = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: styling_1.DefaultPalette.neutralLight,
    selectors: {
        ".flow-action": action,
        ".add-action": {
            backgroundColor: styling_1.DefaultPalette.themeTertiary,
            color: styling_1.DefaultPalette.white,
            selectors: {
                ":hover": {
                    backgroundColor: styling_1.DefaultPalette.themeSecondary,
                }
            }
        }
    }
};
exports.nearActionBar = nearActionBar;
var farActionBar = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: styling_1.DefaultPalette.neutralLight,
    selectors: {
        ".flow-action": action
    }
};
exports.farActionBar = farActionBar;
var body = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "auto",
    //backgroundColor: DefaultPalette.white,
    selectors: {
        "&.has-header": {
            top: headerHeight + headerBorderHeight
        },
        "$window+$window": {
            marginTop: 0
        }
    }
};
exports.body = body;
var windowMargin = 5;
var windowHeaderHeight = 28;
var window = {
    position: "relative",
    marginLeft: windowMargin,
    marginRight: windowMargin,
    marginTop: windowMargin,
    marginBottom: windowMargin,
    boxShadow: "0 0 " + windowMargin + "px 0 rgba(0, 0, 0, 0.4)",
    selectors: {
        "&.content-hidden": {
            height: windowHeaderHeight
        }
    }
};
exports.window = window;
var windowHeader = Object.assign({}, styling_1.DefaultFontStyles.small, {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "flex-start",
    cursor: "pointer",
    overflow: "hidden",
    backgroundColor: styling_1.DefaultPalette.themeDarker,
    color: styling_1.DefaultPalette.white,
    height: windowHeaderHeight
});
exports.windowHeader = windowHeader;
var windowTitleContainer = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    paddingLeft: "8px",
    paddingRight: "8px"
};
exports.windowTitleContainer = windowTitleContainer;
var windowTitle = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
};
exports.windowTitle = windowTitle;
var windowAction = {
    color: styling_1.DefaultPalette.white,
    height: "16px",
    width: "16px",
    lineHeight: "16px",
    marginLeft: "4px",
    marginRight: "4px",
    padding: "0px",
    selectors: {
        ":hover": {
            color: styling_1.DefaultPalette.white,
            backgroundColor: styling_1.DefaultPalette.themeSecondary
        },
        "& .close-action": {
            selectors: {
                ":hover": {
                    color: styling_1.DefaultPalette.white,
                    backgroundColor: styling_1.DefaultPalette.redDark
                }
            }
        },
        ".ms-Icon": {
            lineHeight: "16px",
            fontSize: "8px",
            fontWeight: styling_1.FontWeights.regular,
            margin: "0px",
            height: "16px",
            width: "16px"
        }
    }
};
exports.windowAction = windowAction;
var windowActionBar = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    selectors: {
        ".flow-window-action": windowAction
    }
};
exports.windowActionBar = windowActionBar;
var windowBody = {
    position: "absolute",
    top: headerHeight,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: styling_1.DefaultPalette.white,
    selectors: {
        "&.content-hidden": {
            height: 0,
            overflow: "hidden"
        }
    }
};
exports.windowBody = windowBody;
var appender = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "1px solid transparent",
    lineHeight: styling_1.FontSizes.large,
    margin: windowMargin,
    height: headerHeight,
    selectors: {
        ":hover": {
            border: "1px dashed " + styling_1.DefaultPalette.neutralSecondary
        }
    }
};
exports.appender = appender;
var merged;
var getMerged = function () {
    if (!merged) {
        merged = merge_styles_1.mergeStyleSets({
            root: root,
            header: header,
            nearActionBar: nearActionBar,
            farActionBar: farActionBar,
            body: body,
            window: window,
            windowHeader: windowHeader,
            windowTitleContainer: windowTitleContainer,
            windowTitle: windowTitle,
            windowActionBar: windowActionBar,
            windowBody: windowBody,
            appender: appender
        });
    }
    return merged;
};
var ClassNames = {
    get root() {
        return getMerged().root;
    },
    get header() {
        return getMerged().header;
    },
    get nearActionBar() {
        return getMerged().nearActionBar;
    },
    get farActionBar() {
        return getMerged().farActionBar;
    },
    get body() {
        return getMerged().body;
    },
    get window() {
        return getMerged().window;
    },
    get windowHeader() {
        return getMerged().windowHeader;
    },
    get windowTitleContainer() {
        return getMerged().windowTitleContainer;
    },
    get windowTitle() {
        return getMerged().windowTitle;
    },
    get windowActionBar() {
        return getMerged().windowActionBar;
    },
    get windowBody() {
        return getMerged().windowBody;
    },
    get appender() {
        return getMerged().appender;
    }
};
exports.ClassNames = ClassNames;
//# sourceMappingURL=List.style.js.map