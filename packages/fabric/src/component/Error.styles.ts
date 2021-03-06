import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IErrorStyles {
    root?: IStyle;
    compact?: IStyle;
    message?: IStyle;
    item?: IStyle;
    itemTitle?: IStyle;
    itemValue?: IStyle;
}

const defaultStyles = (theme : ITheme) : IErrorStyles => {
    return  {
        root: {},
        compact: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        message: {
            fontSize: FontSizes.medium,
            backgroundColor: theme.palette.redDark,
            color: theme.palette.white,
            padding: "4px 8px"
        },
        item: {
            margin: 8,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.palette.redDark
        },
        itemTitle: {
            fontSize: FontSizes.small,
            backgroundColor: theme.palette.redDark,
            color: theme.palette.white,
            padding: "4px 8px"
        },
        itemValue: {
            fontSize: FontSizes.small,
            padding: 8,
            overflow: "auto"
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IErrorStyles) => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});


export { IErrorStyles, getStyles, Defaults, defaultStyles }