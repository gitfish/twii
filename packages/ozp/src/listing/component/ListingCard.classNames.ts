import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingCardStyles } from "./ListingCard.styles";

interface IListingCardClassNames {
    root?: string;
    details?: string;
    title?: string;
    shortDescription?: string;
    previewContainer?: string;
}

const getClassNames = memoizeFunction((styles : IListingCardStyles, className : string, clickable : boolean) => {
    return {
        root: mergeStyles("listing-card", className, styles.root, clickable && styles.clickableRoot),
        details: mergeStyles("listing-card-details", styles.details),
        title: mergeStyles("listing-card-title", styles.title),
        shortDescription: mergeStyles("listing-card-short-description", styles.shortDescription),
        previewContainer: mergeStyles("listing-card-preview-container", styles.previewContainer)
    };
});

export { IListingCardStyles, getClassNames }