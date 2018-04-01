import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingListStyles {
    root?: IStyle;
    compactRoot?: IStyle;
    wrappingRoot?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingListStyles | undefined) : IListingListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingListStyles = {
        root: {
            
        },
        compactRoot: {
            display: "flex",
            alignItems: "center"
        },
        wrappingRoot: {
            flexWrap: "wrap"
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingListStyles, getStyles }