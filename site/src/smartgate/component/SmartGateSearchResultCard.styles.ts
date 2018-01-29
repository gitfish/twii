import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISmartGateSearchResultCardStyles {
    root?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISmartGateSearchResultCardStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : ISmartGateSearchResultCardStyles = {
        root: {

        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { ISmartGateSearchResultCardStyles, getStyles }