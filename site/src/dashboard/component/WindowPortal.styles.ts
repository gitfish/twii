import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IWindowPortalStyles {
    root?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IWindowPortalStyles | undefined) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IWindowPortalStyles = {
        root: {
            backgroundColor: theme.palette.white,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto"
        },
        
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IWindowPortalStyles, getStyles }

