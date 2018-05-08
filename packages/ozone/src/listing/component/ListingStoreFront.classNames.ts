import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingStoreFrontStyles } from "./ListingStoreFront.styles";

interface IListingStoreFrontClassNames {
    root?: string;
    header?: string;
    searchInputContainer?: string;
    body?: string;
    section?: string;
    sectionHeader?: string;
    sectionTitle?: string;
    sectionBody?: string;
}

const getClassNames = memoizeFunction((styles : IListingStoreFrontStyles, className?: string) => {
    return {
        root: mergeStyles("listing-store-front", className, styles.root),
        header: mergeStyles("listing-store-front-header", styles.header),
        searchInputContainer: mergeStyles("listing-store-front-search-input-container", styles.searchInputContainer),
        body: mergeStyles("listing-store-front-body", styles.body),
        section: mergeStyles("listing-store-front-section", styles.section),
        sectionHeader: mergeStyles("listing-store-front-section-header", styles.sectionHeader),
        sectionTitle: mergeStyles("listing-store-front-section-title", styles.sectionTitle),
        sectionBody: mergeStyles("listing-store-front-section-body", styles.sectionBody)
    };
});

export { IListingStoreFrontClassNames, getClassNames }