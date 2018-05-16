import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IGridStyles {
    root?: IStyle;
    rowContainer?: IStyle;
    row?: IStyle;
    cell?: IStyle;
    cellContent?: IStyle;
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
            top: 2,
            left: 2
        },
        row: {
            display: "flex"
        },
        cell: {
            position: "relative"
        },
        cellContent: {
            position: "absolute",
            top: 2,
            right: 2,
            bottom: 2,
            left: 2,
            backgroundColor: theme.palette.neutralLight
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IGridStyles, getStyles }