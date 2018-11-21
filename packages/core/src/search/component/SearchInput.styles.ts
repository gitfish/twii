import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISearchInputStyles {
    root?: IStyle;
    menuWrapper?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISearchInputStyles => {
    return {
        root: {
            width: "100%"
        },
        menuWrapper: {
            height: "100%",
            minWidth: 300,
            display: "flex",
            alignItems: "center",
            width: 500
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISearchInputStyles) : ISearchInputStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export {
    ISearchInputStyles,
    defaultStyles,
    Defaults,
    getStyles
}