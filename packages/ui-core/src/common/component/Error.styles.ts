import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IErrorStyles {
    root?: IStyle;
    compact?: IStyle;
    message?: IStyle;
    item?: IStyle;
    itemTitle?: IStyle;
    itemValue?: IStyle;
}

interface IErrorStyleConfig {
    defaultStyles: (theme : ITheme) => IErrorStyles;
}

const defaultStyles = (theme : ITheme) : IErrorStyles => {
    return  {
        root: {},
        compact: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        message: concatStyleSets(theme.fonts.medium, {
            backgroundColor: theme.palette.redDark,
            color: theme.palette.white,
            padding: "4px 8px"
        }),
        item: {
            margin: 8,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.palette.redDark
        },
        itemTitle: concatStyleSets(theme.fonts.small, {
            backgroundColor: theme.palette.redDark,
            color: theme.palette.white,
            padding: "4px 8px"
        }),
        itemValue: concatStyleSets(theme.fonts.small, {
            padding: 8,
            overflow: "auto"
        })
    };
};

const StyleConfig : IErrorStyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IErrorStyles) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});


export { IErrorStyles, IErrorStyleConfig, getStyles, StyleConfig }