import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IWindowPortalStyles {
    root?: IStyle;
}

interface IWindowPortalStyleConfig {
    defaultStyles: (theme : ITheme) => IWindowPortalStyles;
}

const defaultStyles = (theme : ITheme) : IWindowPortalStyles => {
    return {
        root: {
            backgroundColor: theme.palette.white,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        }
    };
};

const StyleConfig : IWindowPortalStyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IWindowPortalStyles | undefined) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});

export { IWindowPortalStyles, IWindowPortalStyleConfig, getStyles, StyleConfig }

