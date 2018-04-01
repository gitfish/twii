import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingPreviewStyles {
    root?: IStyle;
    fallback?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingPreviewStyles | undefined) : IListingPreviewStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingPreviewStyles = {
        root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 228,
            height: 145
        },
        fallback: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 220,
            height: 137
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingPreviewStyles, getStyles }

