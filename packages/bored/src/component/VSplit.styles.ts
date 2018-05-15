import { IStyle, ITheme, getTheme, concatStyleSets, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IVSplitStyles {
    root?: IStyle;
    splitter?: IStyle;
    splitterContent?: IStyle;
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
            left: 0,
            right: 0,
            height: 5
        },
        splitterContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden",
            backgroundColor: theme.palette.neutralTertiaryAlt,
            color: theme.palette.themeDark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            selectors: {
                ".vsplit-icon": {
                    fontSize: FontSizes.mini
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

const StyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IVSplitStyles) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});

export { IVSplitStyles, getStyles, StyleConfig }