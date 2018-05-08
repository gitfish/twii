import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingListStyles } from "./ListingList.styles";

interface IListingListClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : IListingListStyles, className : string, compact : boolean, wrapping : boolean) => {
    return {
        root: mergeStyles("listing-list", className, styles.root, compact && styles.compactRoot, wrapping && styles.wrappingRoot)
    };
});

export { IListingListClassNames, getClassNames }