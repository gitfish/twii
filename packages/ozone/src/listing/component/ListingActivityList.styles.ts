import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingActivityListStyles {
    root?: IStyle;
    items?: IStyle;
    itemsGroupHeader?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingActivityListStyles) : IListingActivityListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingActivityListStyles = {
        root: {
            
        },
        items: {

        },
        itemsGroupHeader: {
            padding: 8
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingActivityListStyles, getStyles }

