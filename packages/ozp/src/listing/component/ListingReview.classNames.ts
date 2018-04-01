import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingReviewStyles } from "./ListingReview.styles";

interface IListingReviewClassNames {
    root?: string;
    iconContainer?: string;
    imageContainer?: string;
}

const getClassNames = memoizeFunction((styles : IListingReviewStyles, className : string) => {
    return {
        root: mergeStyles("listing-review", className, styles.root),
        header: mergeStyles("listing-review-header", styles.header),
        author: mergeStyles("listing-review-author", styles.author),
        date: mergeStyles("listing-review-date", styles.date),
        rating: mergeStyles("listing-review-rating", styles.rating),
        body: mergeStyles("listing-review-body", styles.body),
        content: mergeStyles("listing-review-content", styles.content)
    };
});

export { IListingReviewClassNames, getClassNames }