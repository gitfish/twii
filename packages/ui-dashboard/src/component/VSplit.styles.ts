import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
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

interface IVSplitStyleConfig {
    defaultStyles(theme : ITheme) : IVSplitStyles;
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
            overflow: "hidden"
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

const StyleConfig : IVSplitStyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IVSplitStyles) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});

export { IVSplitStyles, IVSplitStyleConfig, getStyles, StyleConfig }