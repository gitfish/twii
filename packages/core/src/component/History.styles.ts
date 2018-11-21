import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IHistoryStyles {
    root?: IStyle;
    empty?: IStyle;
    cell?: IStyle;
}

const defaultStyles = (theme : ITheme) : IHistoryStyles => {
    return {
        root: {

        },
        empty: {
            minHeight: 28,
            paddingLeft: 8,
            paddingRight: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start"
        },
        cell: {
            minHeight: 28,
            paddingLeft: 8,
            paddingRight: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            selectors: {
                "&.selectable": {
                    cursor: "pointer"
                },
                "&:hover": {
                    backgroundColor: theme.palette.neutralLight
                }
            }
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IHistoryStyles) : IHistoryStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IHistoryStyles, getStyles, defaultStyles, Defaults }