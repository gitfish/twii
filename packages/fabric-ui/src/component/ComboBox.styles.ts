import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IComboBoxStyles {
    root?: IStyle;
    callout?: IStyle;
    list?: IStyle;
    listItem?: IStyle;
    inputContainer?: IStyle;
    input?: IStyle;
    selectControl?: IStyle;
    selectControlIcon?: IStyle;
}

const defaultStyles = (theme : ITheme) : IComboBoxStyles => {
    return {
        root: {},
        callout: {},
        inputContainer: {
            border: `1px solid ${theme.palette.neutralTertiary}`,
            background: theme.palette.white,
            height: 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            position: "relative",
            selectors: {
                "&:hover": {
                    borderColor: theme.palette.neutralSecondary
                }
            }
        },
        input: {
            boxSizing: "border-box",
            boxShadow: "none",
            margin: 0,
            padding: 0,
            fontSize: 14,
            borderRadius: 0,
            border: "none",
            color: theme.palette.neutralDark,
            width: "100%",
            textOverflow: "ellipsis",
            outline: 0
        },
        selectControl: {
            selectors: {
                "&:hover": {
                    backgroundColor: theme.palette.neutralLight
                }
            }
        },
        selectControlIcon: Object.assign({}, theme.fonts.medium, {

        }),
        list: {},
        listItem: {
            background: "0 0",
            boxSizing: "border-box",
            cursor: "pointer",
            display: "block",
            width: "100%",
            height: "auto",
            minHeight: 30,
            lineHeight: 20,
            padding: "5px 16px",
            position: "relative",
            border: "1px solid transparent",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            textAlign: "left",
            color: theme.palette.neutralPrimary,
            selectors: {
                "&.is-selected": {
                    backgroundColor: theme.palette.neutralTertiaryAlt,
                    color: theme.palette.black,
                    selectors: {
                        "&:hover": {
                            backgroundColor: theme.palette.neutralTertiaryAlt
                        }
                    }
                },
                "&:hover": {
                    backgroundColor: theme.palette.neutralLighter
                }
            }
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IComboBoxStyles) => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export { IComboBoxStyles, getStyles, Defaults, defaultStyles }