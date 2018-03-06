import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IDashboardStyles {
    root?: IStyle;
    overlay?: IStyle;
    content?: IStyle;
}

interface IDashboardStyleConfig {
    defaultStyles: (theme : ITheme) => IDashboardStyles;
}

const defaultStyles = (theme : ITheme) : IDashboardStyles => {
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.neutralTertiary,
            selectors: {
                "&.hidden": {
                    top: -1,
                    left: -1,
                    width: 0,
                    height: 0,
                    overflow: "hidden"
                }
            }
        },
        overlay: {
            selectors: {
                "&.hsplit": {
                    cursor: "ew-resize"
                },
                "&.vsplit": {
                    cursor: "ns-resize"
                }
            }
        },
        content: {
            position: "absolute",
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        }
    }
};

const StyleConfig : IDashboardStyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IDashboardStyles) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});

export { IDashboardStyles, IDashboardStyleConfig, getStyles, StyleConfig }