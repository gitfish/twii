import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IDetailsStyles {
    root?: IStyle;
    header?: IStyle;
    summary?: IStyle;
    control?: IStyle;
    actionContainer?: IStyle;
    action?: IStyle;
    body?: IStyle;
}

const defaultStyles = (theme : ITheme) : IDetailsStyles => {
    return {
        root: {
            selectors: {
                "&.has-border": {
                    borderWidth: "1px",
                    borderColor: theme.palette.neutralSecondary,
                    borderStyle: "solid"
                }
            }
        },
        header: Object.assign({}, theme.fonts.small, {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
            backgroundColor: theme.palette.neutralSecondary,
            color: theme.palette.white,
            height: 28,
            lineHeight: 28,
            userSelect: "none",
            selectors: {
                "&:hover": {
                    backgroundColor: theme.palette.orange
                },
                "&.is-control": {
                    cursor: "pointer"
                }
            }
        }),
        summary: Object.assign({}, theme.fonts.small, {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: 8,
            selectors: {
                ".ms-Icon": [
                    {
                        fontSize: FontSizes.small,
                        paddingRight: "6px",
                        height: "16px",
                        lineHeight: "16px"
                    }
                ]
            }
        }),
        control: Object.assign({}, theme.fonts.small, {
            outline: "none",
            color: theme.palette.white,
            selectors: {
                ".ms-Icon": [
                    {
                        fontSize: FontSizes.small,
                        color: theme.palette.white
                    }
                ]
            }
        }),
        actionContainer: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "absolute",
            top: "0px",
            right: "0px",
            bottom: "0px",
            background: "transparent",
            color: theme.palette.white
        },
        action: {
            color: theme.palette.white,
            selectors: {
                ".ms-Icon": [
                    {
                        fontSize: FontSizes.small,
                        color: theme.palette.white
                    }
                ]
            }
        },
        body: {
            position: "relative",
            overflow: "auto",
            selectors: {
                ".ms-TextField, .ms-Dropdown-container": {
                    marginBottom: 8
                }
            }
        }
    };
};

const Defaults = {
    styles : defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IDetailsStyles) => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export { IDetailsStyles, getStyles, Defaults, defaultStyles }