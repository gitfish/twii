import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IStackStyles {
    root?: IStyle;
    header?: IStyle;
    tabBar?: IStyle;
    actionBar?: IStyle;
    action?: IStyle;
    actionIcon?: IStyle;
    closeAction?: IStyle;
    closeActionIcon?: IStyle;
    addAction?: IStyle;
    tab?: IStyle;
    tabTitleContainer?: IStyle;
    tabTitle?: IStyle;
    tabActionBar?: IStyle;
    tabAction?: IStyle;
    tabPanel?: IStyle;
    body?: IStyle;
    dragOverlay?: IStyle;
    dragOverlayFeedback?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IStackStyles) => {
    if(!theme) {
        theme = getTheme();
    }

    const DefaultActionStyle : IStyle = {
        color: theme.palette.themeDarker,
        height: 28,
        width: 28,
        lineHeight: 28,
        background: "transparent",
        border: "none",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
    };

    const DefaultStyles : IStackStyles = {
        root: {
            position: "absolute",
            left: 5,
            top: 5,
            bottom: 5,
            right: 5,
            boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.4)`,
            selectors: {
                ".pane &": {
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    boxShadow: "none"
                }
            }
        },
        header: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 28,
            backgroundColor: theme.palette.neutralLight,
            color: theme.palette.themeDarker,
            //borderBottom: `1px solid ${theme.palette.themeDarker}`,
            overflow: "hidden"
        },
        tab: {
            position: "relative",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: theme.palette.themeTertiary,
            color: theme.palette.white,
            cursor: "pointer",
            marginLeft: 1,
            selectors: {
                "&.first": {
                    marginLeft: 0
                },
                ":hover": {
                    backgroundColor: theme.palette.themeSecondary
                },
                "&.active": {
                    backgroundColor: theme.palette.themeDarker
                }
            }
        },
        addAction: {
            backgroundColor: theme.palette.themeTertiary,
            color: theme.palette.white,
            outline: "none",
            border: "none",
            height: 28,
            width: 28,
            marginLeft: 1,
            cursor: "pointer",
            selectors: {
                ":hover": {
                    backgroundColor: theme.palette.themeSecondary
                },
                ".stack-add-action-icon": {
                    color: theme.palette.white,
                    fontSize: theme.fonts.small.fontSize
                }
            }
        },
        tabBar: {
            background: "transparent",
            display: "flex",
            justifyContent: "flex-start",
            height: "100%"
        },
        tabTitleContainer: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            maxWidth: 130,
            overflow: "hidden",
            paddingLeft: 8,
            paddingRight: 8
        },
        tabTitle: Object.assign({}, theme.fonts.small, {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        }),
        tabAction: {
            color: theme.palette.white,
            height: 16,
            width: 16,
            lineHeight: 16,
            marginLeft: "4px",
            marginRight: "4px",
            padding: "0px",
            outline: "none",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            selectors: {
                "&.close-action": {
                    selectors: {
                        ":hover": {
                            color: theme.palette.white,
                            backgroundColor: theme.palette.redDark
                        }
                    }
                },
                ".stack-tab-action-icon": {
                    lineHeight: 8,
                    fontSize: 8,
                    fontWeight: FontWeights.regular,
                    margin: 0,
                    height: 8,
                    width: 8
                }
            }
        },
        tabActionBar: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        tabPanel: {

        },
        action: DefaultActionStyle,
        actionIcon: {
            fontSize: theme.fonts.small.fontSize,
            fontWeight: FontWeights.regular
        },
        closeAction: Object.assign({}, DefaultActionStyle, {
            selectors: {
                ":hover": {
                    color: theme.palette.white,
                    backgroundColor: theme.palette.redDark
                }
            }
        }),
        closeActionIcon: {
            fontSize: theme.fonts.small.fontSize,
            fontWeight: FontWeights.regular
        },
        actionBar: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: theme.palette.neutralLight
        },
        body: {
            position: "absolute",
            top: 28,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.white
        },
        dragOverlay: {
            background: "transparent"
        },
        dragOverlayFeedback: {
            transition: "all 100ms ease",
            backgroundColor: theme.palette.neutralTertiary,
            opacity: 0.5
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IStackStyles, getStyles }