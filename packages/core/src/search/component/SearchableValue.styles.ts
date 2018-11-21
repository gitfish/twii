import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISearchableValueStyles {
    root?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISearchableValueStyles => {
    return {
        root: {
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISearchableValueStyles) : ISearchableValueStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { ISearchableValueStyles, getStyles, defaultStyles, Defaults }