import { IStyle, ITheme, getTheme, concatStyleSets, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IHSplitStyles {
    root?: IStyle;
    splitter?: IStyle;
    splitterHandle?: IStyle;
    leftPane?: IStyle;
    leftContent?: IStyle;
    rightPane?: IStyle;
    rightContent?: IStyle;
}

const defaultStyles = (theme : ITheme) : IHSplitStyles => {
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        splitter: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            backgroundColor: theme.palette.neutralSecondary 
        },
        splitterHandle: {
            cursor: "ew-resize",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: -2,
            right: -2,
            overflow: "hidden",
            backgroundColor: "transparent",
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
                ".hsplit-icon": {
                    fontSize: FontSizes.mini,
                    visibility: "hidden",
                    color: theme.palette.white
                },
                "&.active": {
                    backgroundColor: theme.palette.neutralSecondary,
                    opacity: 1.0,
                    selectors: {
                        ".hsplit-icon": {
                            visibility: "visible"
                        }
                    }
                }
            }
        },
        leftPane: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            overflow: "hidden"
        },
        leftContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        },
        rightPane: {
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            overflow: "hidden"
        },
        rightContent: {
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

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IHSplitStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IHSplitStyles, getStyles, Defaults, defaultStyles }