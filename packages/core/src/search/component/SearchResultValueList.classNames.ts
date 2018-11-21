import { memoizeFunction } from "@uifabric/utilities";
import { ISearchResultValueListStyles } from "./SearchResultValueList.styles";
import { mergeStyleSets } from "@uifabric/styling";

interface ISearchResultValueListClassNames {
    root?: string;
    cell?: string;
}

const getClassNames = memoizeFunction((styles : ISearchResultValueListStyles, className?: string) : ISearchResultValueListClassNames => {
    return mergeStyleSets({
        root: ["search-result-value-list", styles.root, className],
        cell: ["search-result-value-list-cell", styles.cell]
    })
});

export { ISearchResultValueListClassNames, getClassNames }