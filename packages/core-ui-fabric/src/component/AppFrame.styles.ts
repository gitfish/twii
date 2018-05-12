import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IAppFrameStyles {
    root?: IStyle;
    frame?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IAppFrameStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IAppFrameStyles = {
        root: {
            overflow: "hidden",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        frame: {
            position: "absolute",
            top: 0,
            left: 0,
            border: "none"
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IAppFrameStyles, getStyles }