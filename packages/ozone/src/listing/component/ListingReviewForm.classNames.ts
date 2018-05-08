import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingReviewFormStyles } from "./ListingReviewForm.styles";

interface IListingReviewFormClassNames {
    root?: string;
    items?: string;
}

const getClassNames = memoizeFunction((styles : IListingReviewFormStyles, className : string) => {
    return {
        root: mergeStyles("listing-review-form", className, styles.root),
        editor: mergeStyles("listing-review-form-editor", styles.editor),
        actions: mergeStyles("listing-review-form-actions", styles.actions)
    };
});

export { IListingReviewFormClassNames, getClassNames }