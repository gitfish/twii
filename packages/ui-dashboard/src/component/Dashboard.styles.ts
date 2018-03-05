import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IDashboardStyles {
    root?: IStyle;
    overlay?: IStyle;
}

interface IDashboardStyleConfig {
    defaultStyles: (theme : ITheme) => IDashboardStyles;
}

const defaultStyles = (theme : ITheme) : IDashboardStyles => {
    return {
        root: {
            backgroundColor: theme.palette.neutralTertiaryAlt
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