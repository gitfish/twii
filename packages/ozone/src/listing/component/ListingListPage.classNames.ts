import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingListPageStyles } from "./ListingListPage.styles";

interface IListingListPageClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : IListingListPageStyles, className : string) => {
    return {
        root: mergeStyles("listing-list-page", className, styles.root),
        header: mergeStyles("listing-list-page-header", styles.header),
        body: mergeStyles("listing-list-page-body", styles.body)
    };
});

export { IListingListPageClassNames, getClassNames }