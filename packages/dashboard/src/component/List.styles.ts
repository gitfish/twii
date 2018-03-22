import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListStyles {
    root?: IStyle;
    header?: IStyle;
    action?: IStyle;
    nearActionBar?: IStyle;
    farActionBar?: IStyle;
    body?: IStyle;
    window?: IStyle;
    windowHeader?: IStyle;
    windowTitleContainer?: IStyle;
    windowTitle?: IStyle;
    windowActionBar?: IStyle;
    windowAction?: IStyle;
    windowBody?: IStyle;
    appender?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IListStyles) => {
    if(!theme) {
        theme = getTheme();
    }

    const DefaultStyles : IListStyles = {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        header: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 28,
            backgroundColor: theme.palette.neutralLight,
            color: theme.palette.themeDarker,
            borderBottom: `1px solid ${theme.palette.themeDarker}`
        },
        action: {
            color: theme.palette.themeDarker
        },
        nearActionBar: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: theme.palette.neutralLight,
            selectors: {
                ".add-action": {
                    backgroundColor: theme.palette.themeTertiary,
                    color: theme.palette.white,
                    selectors: {
                        ":hover": {
                            backgroundColor: theme.palette.themeSecondary,
                        }
                    }
                }
            }
        },
        farActionBar: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: theme.palette.neutralLight
        },
        body: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto",
            //backgroundColor: DefaultPalette.white,
            selectors: {
                "&.has-header": {
                    top: 29
                },
                "$window+$window": {
                    marginTop: 0
                }
            }
        },
        window: {
            position: "relative",
            marginLeft: 5,
            marginRight: 5,
            marginTop: 5,
            marginBottom: 5,
            boxShadow: `0 0 ${5}px 0 rgba(0, 0, 0, 0.4)`,
            selectors: {
                "&.content-hidden": {
                    height: 28
                }
            }
        },
        windowHeader: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "flex-start",
            cursor: "pointer",
            overflow: "hidden",
            backgroundColor: theme.palette.themeDarker,
            color: theme.palette.white,
            height: 28
        },
        windowTitleContainer: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
            paddingLeft: 8,
            paddingRight: 8
        },
        windowTitle: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        },
        windowAction: {
            color: theme.palette.white,
            height: "16px",
            width: "16px",
            lineHeight: "16px",
            marginLeft: "4px",
            marginRight: "4px",
            padding: "0px",

            selectors: {
                ":hover": {
                    color: theme.palette.white,
                    backgroundColor: theme.palette.themeSecondary
                },
                "& .close-action": {
                    selectors: {
                        ":hover": {
                            color: theme.palette.white,
                            backgroundColor: theme.palette.redDark
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
        },
        windowActionBar: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        windowBody: {
            position: "absolute",
            top: 28,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: theme.palette.white,
            selectors: {
                "&.content-hidden": {
                    height: 0,
                    overflow: "hidden"
                }
            }
        },
        appender: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            border: "1px solid transparent",
            lineHeight: FontSizes.large,
            margin: 5,
            height: 28,
            selectors: {
                ":hover": {
                    border: `1px dashed ${theme.palette.neutralSecondary}`
                }
            }
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListStyles, getStyles }