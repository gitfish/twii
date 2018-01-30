import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, FontSizes, FontWeights, IStyle, IStyleSet } from "@uifabric/styling";

interface IListClassNames {
    root: string;
    header: string;
    nearActionBar: string;
    farActionBar: string;
    body: string;
    window: string;
    windowHeader: string;
    windowTitleContainer: string;
    windowTitle: string;
    windowActionBar: string;
    windowBody: string;
    appender: string;
}

const root : IStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

const headerHeight = 28;
const headerBorderHeight = 1;

const header : IStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: headerHeight,
    backgroundColor: DefaultPalette.neutralLight,
    color: DefaultPalette.themeDarker,
    borderBottom: `${headerBorderHeight}px solid ${DefaultPalette.themeDarker}`
};

const tabPanel : IStyle = {

};

const action : IStyle = {
    color: DefaultPalette.themeDarker,
    selectors: {
        ".ms-Icon": {
            fontSize: FontSizes.small,
            fontWeight: FontWeights.regular
        },
        "& .close-action": {
            selectors: {
                ":hover": {
                    color: DefaultPalette.white,
                    backgroundColor: DefaultPalette.redDark
                }
            }
        }
    }
};

const nearActionBar : IStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: DefaultPalette.neutralLight,
    selectors: {
        ".flow-action": action,
        ".add-action": {
            backgroundColor: DefaultPalette.themeTertiary,
            color: DefaultPalette.white,
            selectors: {
                ":hover": {
                    backgroundColor: DefaultPalette.themeSecondary,
                }
            }
        }
    }
}

const farActionBar : IStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: DefaultPalette.neutralLight,
    selectors: {
        ".flow-action": action
    }
};

const body : IStyle = {
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

const windowMargin = 5;
const windowHeaderHeight = 28;

const window : IStyle = {
    position: "relative",
    marginLeft: windowMargin,
    marginRight: windowMargin,
    marginTop: windowMargin,
    marginBottom: windowMargin,
    boxShadow: `0 0 ${windowMargin}px 0 rgba(0, 0, 0, 0.4)`,
    selectors: {
        "&.content-hidden": {
            height: windowHeaderHeight
        }
    }
};

const windowHeader : IStyle = Object.assign({}, DefaultFontStyles.small, {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "flex-start",
    cursor: "pointer",
    overflow: "hidden",
    backgroundColor: DefaultPalette.themeDarker,
    color: DefaultPalette.white,
    height: windowHeaderHeight
});

const windowTitleContainer : IStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    paddingLeft: "8px",
    paddingRight: "8px"
};

const windowTitle : IStyle = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
};

const windowAction : IStyle = {
    color: DefaultPalette.white,
    height: "16px",
    width: "16px",
    lineHeight: "16px",
    marginLeft: "4px",
    marginRight: "4px",
    padding: "0px",

    selectors: {
        ":hover": {
            color: DefaultPalette.white,
            backgroundColor: DefaultPalette.themeSecondary
        },
        "& .close-action": {
            selectors: {
                ":hover": {
                    color: DefaultPalette.white,
                    backgroundColor: DefaultPalette.redDark
                }
            }
        },
        ".ms-Icon": {
            lineHeight: "16px",
            fontSize: "8px",
            fontWeight: FontWeights.regular,
            margin: "0px",
            height: "16px",
            width: "16px"
        }
    }
};

const windowActionBar : IStyle = {
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

const windowBody : IStyle = {
    position: "absolute",
    top: headerHeight,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: DefaultPalette.white,
    selectors: {
        "&.content-hidden": {
            height: 0,
            overflow: "hidden"
        }
    }
};

const appender : IStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "1px solid transparent",
    lineHeight: FontSizes.large,
    margin: windowMargin,
    height: headerHeight,
    selectors: {
        ":hover": {
            border: `1px dashed ${DefaultPalette.neutralSecondary}`
        }
    }
}

let merged : IListClassNames;

const getMerged = () : IListClassNames => {
    if(!merged) {
        merged = mergeStyleSets({
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

const ClassNames : IListClassNames = {
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
}

export {
    IListClassNames,
    ClassNames,
    root,
    header,
    farActionBar,
    nearActionBar,
    action,
    body,
    window,
    windowHeader,
    windowTitleContainer,
    windowTitle,
    windowActionBar,
    windowAction,
    windowBody,
    appender
}