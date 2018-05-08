import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingReviewListStyles } from "./ListingReviewList.styles";

interface IListingReviewListClassNames {
    root?: string;
    items?: string;
}

const getClassNames = memoizeFunction((styles : IListingReviewListStyles, className : string) => {
    return {
        root: mergeStyles("listing-review-list", className, styles.root),
        items: mergeStyles("listing-review-list-items", styles.items),
        addContainer: mergeStyles("listing-review-list-add-container", styles.addContainer)
    };
});

export { IListingReviewListClassNames, getClassNames }