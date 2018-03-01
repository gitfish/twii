import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IStackStyles {
    root?: IStyle;
    header?: IStyle;
    tabBar?: IStyle;
    actionBar?: IStyle;
    action?: IStyle;
    actionIcon?: IStyle;
    addAction?: IStyle;
    tab?: IStyle;
    tabTitleContainer?: IStyle;
    tabTitle?: IStyle;
    tabActionBar?: IStyle;
    tabAction?: IStyle;
    tabActionIcon?: IStyle;
    tabPanel?: IStyle;
    body?: IStyle;
    dragOverlay?: IStyle;
    dragOverlayFeedback?: IStyle;
}

interface IStackStyleConfig {
    defaultStyles: (theme : ITheme) => IStackStyles;
}

const defaultStyles = (theme : ITheme) : IStackStyles => {
    const action : IStyle = {
        color: theme.palette.white,
        height: 28,
        width: 28,
        lineHeight: 28,
        background: "transparent",
        border: "none",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        selectors: {
            "&.close-action": {
                selectors: {
                    ":hover": {
                        color: theme.palette.white,
                        backgroundColor: theme.palette.redDark
                    }
                }
            }
        }
    };

    const tab : IStyle = {
        position: "relative",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: theme.palette.themeDarkAlt,
        color: theme.palette.white,
        cursor: "pointer",
        height: 26,
        marginLeft: 2,
        selectors: {
            "&.active": {
                backgroundColor: theme.palette.neutralLighter,
                color: theme.palette.themeDarkAlt,
                selectors: {
                    ":hover": {
                        backgroundColor: theme.palette.neutralLighter
                    }
                }
            },
            ":hover": {
                backgroundColor: theme.palette.themeSecondary
            }
        }
    };

    const tabAction : IStyle = {
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
            "&.active": {
                color: theme.palette.themeDarkAlt
            },
            "&.close-action": {
                selectors: {
                    ":hover": {
                        color: theme.palette.white,
                        backgroundColor: theme.palette.redDark
                    }
                }
            }
        }
    };

    return {
        root: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0
        },
        header: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 28,
            backgroundColor: theme.palette.themeDarkAlt,
            color: theme.palette.white,
            overflow: "hidden"
        },
        tab: tab,
        addAction: {
            backgroundColor: theme.palette.themeSecondary,
            color: theme.palette.white,
            outline: "none",
            border: "none",
            height: 26,
            width: 26,
            marginLeft: 2,
            cursor: "pointer",
            selectors: {
                ":hover": {
                    backgroundColor: theme.palette.themeTertiary
                },
                "& .stack-add-action-icon": {
                    color: theme.palette.white,
                    fontSize: theme.fonts.small.fontSize
                }
            }
        },
        tabBar: {
            background: "transparent",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
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
        tabAction: tabAction,
        tabActionIcon: {
            lineHeight: 8,
            fontSize: 8,
            fontWeight: FontWeights.regular,
            margin: 0,
            height: 8,
            width: 8
        },
        tabActionBar: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        tabPanel: {

        },
        action: action,
        actionIcon: {
            fontSize: theme.fonts.small.fontSize,
            fontWeight: FontWeights.regular
        },
        actionBar: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: theme.palette.themeDarkAlt
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
};

const StyleConfig : IStackStyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IStackStyles) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});

export { IStackStyles, IStackStyleConfig, getStyles, StyleConfig }