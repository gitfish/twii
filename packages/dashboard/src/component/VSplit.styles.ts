import { IStyle, ITheme, getTheme, concatStyleSets, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IVSplitStyles {
    root?: IStyle;
    splitter?: IStyle;
    splitterHandle?: IStyle;
    topPane?: IStyle;
    topContent?: IStyle;
    bottomPane?: IStyle;
    bottomContent?: IStyle;
}

const defaultStyles = (theme : ITheme) : IVSplitStyles => {
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        splitter: {
            cursor: "ns-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            backgroundColor: theme.palette.neutralSecondary,
            left: 0,
            right: 0
        },
        splitterHandle: {
            position: "absolute",
            top: -2,
            right: 0,
            bottom: -2,
            left: 0,
            overflow: "hidden",
            backgroundColor: "transparent",
            color: theme.palette.neutralSecondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: "background-color 0.3s ease",
            selectors: {
                ":hover": {
                    backgroundColor: theme.palette.neutralSecondary,
                    opacity: 0.5,
                },
                ".vsplit-icon": {
                    fontSize: FontSizes.mini,
                    visibility: "hidden",
                    color: theme.palette.white
                },
                "&.active": {
                    backgroundColor: theme.palette.neutralSecondary,
                    opacity: 1.0,
                    selectors: {
                        ".vsplit-icon": {
                            visibility: "visible"
                        }
                    }
                }
            }
        },
        topPane: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            overflow: "hidden"
        },
        topContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        },
        bottomPane: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            overflow: "hidden"
        },
        bottomContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IVSplitStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IVSplitStyles, getStyles, Defaults, defaultStyles }