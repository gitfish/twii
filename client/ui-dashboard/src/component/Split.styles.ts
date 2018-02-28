import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IHSplitStyles {
    root?: IStyle;
    splitter?: IStyle;
    leftPane?: IStyle;
    rightPane?: IStyle;
}

const getHSplitStyles = memoizeFunction((theme : ITheme, customStyles?: IHSplitStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IHSplitStyles = {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        splitter: {
            cursor: "ew-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 5
        },
        leftPane: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            overflow: "auto"
        },
        rightPane: {
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            overflow: "auto"
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

interface IVSplitStyles {
    root?: IStyle;
    splitter?: IStyle;
    topPane?: IStyle;
    bottomPane?: IStyle;
}

const getVSplitStyles = memoizeFunction((theme : ITheme, customStyles?: IVSplitStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IVSplitStyles = {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        splitter: {
            cursor: "ns-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 5
        },
        topPane: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            overflow: "auto"
        },
        bottomPane: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            overflow: "auto"
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IHSplitStyles, IVSplitStyles, getHSplitStyles, getVSplitStyles }
