import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
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
            marginTop: "0px",
            marginBottom: "0px"
        },
        title: {
            fontWeight: FontWeights.semibold,
            margin: "0px",
            cursor: "inherit",
            selectors: {
                "label": {
                    cursor: "inherit"
                }
            }
        },
        data: {
            fontWeight: FontWeights.light,
            marginLeft: "8px",
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