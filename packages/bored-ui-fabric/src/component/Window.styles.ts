import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IWindowStyles {
    root?: IStyle;
    header?: IStyle;
    titleContainer?: IStyle;
    title?: IStyle;
    actionBar?: IStyle;
    action?: IStyle;
    body?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IWindowStyles) => {
    if(!theme) {
        theme = getTheme();
    }

    const DefaultStyles : IWindowStyles = {
        root: {
            position: "absolute",
            top: 8,
            right: 8,
            bottom: 8,
            left: 8,
            boxShadow: `0 0 ${5}px 0 rgba(0, 0, 0, 0.4)`,
            backgroundColor: theme.palette.white,
            selectors: {
                "&.content-hidden": {
                    height: 28
                }
            }
        },
        header: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "flex-start",
            cursor: "pointer",
            overflow: "hidden",
            backgroundColor: theme.palette.themeDarkAlt,
            color: theme.palette.white,
            height: 28
        },
        titleContainer: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
            paddingLeft: 8,
            paddingRight: 8
        },
        title: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        },
        action: {
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
        actionBar: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        body: {
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
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IWindowStyles, getStyles }