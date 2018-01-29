import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingReviewStyles {
    root?: IStyle;
    header?: IStyle;
    author?: IStyle;
    date?: IStyle;
    rating?: IStyle;
    body?: IStyle;
    content?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingReviewStyles | undefined) : IListingReviewStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingReviewStyles = {
        root: {
            margin: "16px 8px",
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)"
        },
        header: {
            padding: "4px 8px",
            selectors: {
                ".ms-RatingStar-front": {
                    color: theme.palette.yellow
                }
            }
        },
        author: {
            fontWeight: FontWeights.semibold
        },
        date: {
            color: theme.palette.neutralSecondary
        },
        rating: {
            
        },
        body: {
            padding: "4px 8px"
        },
        content: {
            marginTop: 8,
            marginBottom: 8
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingReviewStyles, getStyles }

