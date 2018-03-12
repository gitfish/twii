import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IHSplitStyles {
    root?: IStyle;
    splitter?: IStyle;
    splitterContent?: IStyle;
    leftPane?: IStyle;
    leftContent?: IStyle;
    rightPane?: IStyle;
    rightContent?: IStyle;
}

interface IHSplitStyleConfig {
    defaultStyles(theme : ITheme) : IHSplitStyles;
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
            cursor: "ew-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 5
        },
        splitterContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden"
        },
        leftPane: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            overflow: "hidden",
            boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.4)`
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
            overflow: "hidden",
            boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.4)`
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

const StyleConfig : IHSplitStyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IHSplitStyles) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});

export { IHSplitStyles, IHSplitStyleConfig, getStyles, StyleConfig }