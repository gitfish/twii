import { memoizeFunction } from "@uifabric/utilities";
import { ISelectableDetailsListStyles } from "./SelectableDetailsList.styles";
import { mergeStyleSets } from "@uifabric/styling";

interface ISelectableDetailsListClassNames {
    root?: string;
    row?: string;
}

const getClassNames = memoizeFunction((styles : ISelectableDetailsListStyles, className?: string) : ISelectableDetailsListClassNames => {
    return mergeStyleSets({
        root: ["selectable-details-list", styles.root, className],
        row: ["selectable-details-list-row", styles.row]
    })
});

export { ISelectableDetailsListClassNames, getClassNames }