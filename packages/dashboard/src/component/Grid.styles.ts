import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IGridStyles {
    root?: IStyle;
    gridCells?: IStyle;
    overlay?: IStyle;
    row?: IStyle;
    cell?: IStyle;
}

const defaultStyles = (theme : ITheme) : IGridStyles => {
    return {
        root: {},
        gridCells: {},
        overlay: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.white,
            opacity: 0.1,
            zIndex: 2
        },
        row: {
            display: "flex"
        },
        cell: {
            backgroundColor: theme.palette.neutralLight
        }
    };
}

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IGridStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IGridStyles, getStyles, Defaults, defaultStyles }