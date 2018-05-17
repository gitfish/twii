import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IGridStyles {
    root?: IStyle;
    rowContainer?: IStyle;
    row?: IStyle;
    cell?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IGridStyles) => {
    if(!theme) {
        theme = getTheme();
    }

    const DefaultStyles : IGridStyles = {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        },
        rowContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: theme.palette.neutralLighter
        },
        row: {
            display: "flex"
        },
        cell: {
            backgroundColor: theme.palette.neutralLight
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IGridStyles, getStyles }