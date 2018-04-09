import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IDefinitionListGroupStyles {
    root?: IStyle;
    list?: IStyle;
}

const defaultStyles = (theme : ITheme) : IDefinitionListGroupStyles => {
    return {
        root: Object.assign({}, theme.fonts.small, {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
        }),
        list: {
            paddingLeft: 8
        }
    };
};

const StyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IDefinitionListGroupStyles) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});

export { IDefinitionListGroupStyles, getStyles, StyleConfig }