import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IDefinitionListStyles {
    root?: IStyle;
    title?: IStyle;
    data?: IStyle;
}

const defaultStyles = (theme : ITheme) : IDefinitionListStyles => {
    return  {
        root: {
            cursor: "inherit",
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: 0,
            marginBottom: 0,
            minHeight: 20
        },
        title: {
            fontWeight: FontWeights.semibold,
            marginRight: 8,
            cursor: "inherit",
            selectors: {
                "label": {
                    cursor: "inherit"
                }
            }
        },
        data: {
            fontWeight: FontWeights.light,
            margin: 0,
            cursor: "inherit"
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IDefinitionListStyles) => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export { IDefinitionListStyles, getStyles, Defaults, defaultStyles }