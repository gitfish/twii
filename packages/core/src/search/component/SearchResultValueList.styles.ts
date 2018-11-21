import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISearchResultValueListStyles {
    root?: IStyle;
    cell?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISearchResultValueListStyles => {
    return {
        root: {},
        cell: {
            padding: "4px 8px",
            borderTop: `1px solid ${theme.palette.neutralLight}`,
            selectors: {
                "&.first": {
                    borderTop: "none"
                }
            }
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles : ISearchResultValueListStyles) : ISearchResultValueListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { ISearchResultValueListStyles, defaultStyles, Defaults, getStyles }