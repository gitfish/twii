import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingActivityListStyles } from "./ListingActivityList.styles";

interface IListingActivityListClassNames {
    root?: string;
    items?: string;
    itemsGroupHeader?: string;
}

const getClassNames = memoizeFunction((styles : IListingActivityListStyles, className : string) => {
    return {
        root: mergeStyles("listing-activity-list", className, styles.root),
        items: mergeStyles("listing-activity-list-items", styles.items),
        itemsGroupHeader: mergeStyles("listing-activity-list-items-group-header", styles.itemsGroupHeader)
    };
});

export { IListingActivityListClassNames, getClassNames }