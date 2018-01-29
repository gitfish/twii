import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingStyles } from "./Listing.styles";

interface IListingClassNames {
    root?: string;
    header?: string;
    preview?: string;
    actions?: string;
    summary?: string;
    title?: string;
    shortDescription?: string;
    body?: string;
    description?: string;
}

const getClassNames = memoizeFunction((styles : IListingStyles, className?: string) => {
    return {
        root: mergeStyles("listing", className, styles.root),
        header: mergeStyles("listing-header", styles.header),
        headerContent: mergeStyles("listing-header-content", styles.headerContent), 
        summary: mergeStyles("listing-summary", styles.summary),
        title: mergeStyles("listing-title", styles.title),
        shortDescription: mergeStyles("listing-short-description", styles.shortDescription),
        actions: mergeStyles("listing-actions", styles.actions),
        body: mergeStyles("listing-body", styles.body),
        description: mergeStyles("listing-description", styles.description)
    };
});

export { IListingClassNames, getClassNames }