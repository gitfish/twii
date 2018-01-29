import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingReviewFormStyles {
    root?: IStyle;
    editor?: IStyle;
    actions?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingReviewFormStyles | undefined) : IListingReviewFormStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingReviewFormStyles = {
        root: {
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)"
        },
        editor: {
            selectors: {
                ".rating": {
                    padding: "4px 8px"
                },
                ".review": {
                    padding: "4px 8px"
                }
            }
        },
        actions: {
            padding: "4px 8px",
            selectors: {
                ".ms-Button+.ms-Button": {
                    marginLeft: 8
                }
            }
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingReviewFormStyles, getStyles }