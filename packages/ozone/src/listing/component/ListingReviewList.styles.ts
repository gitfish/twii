import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingReviewListStyles {
    root?: IStyle;
    items?: IStyle;
    addContainer?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingReviewListStyles | undefined) : IListingReviewListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingReviewListStyles = {
        root: {
            
        },
        items: {

        },
        addContainer: {
            margin: "16px 8px"
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingReviewListStyles, getStyles }

