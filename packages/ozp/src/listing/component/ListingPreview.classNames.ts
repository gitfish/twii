import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingPreviewStyles } from "./ListingPreview.styles";

interface IListingPreviewClassNames {
    root?: string;
    fallback?: string;
}

const getClassNames = memoizeFunction((styles : IListingPreviewStyles, className : string) => {
    return {
        root: mergeStyles("listing-preview", className, styles.root),
        fallback: mergeStyles("listing-preview-fallback", styles.fallback)
    };
});

export { IListingPreviewClassNames, getClassNames }