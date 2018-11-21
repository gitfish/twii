import { memoizeFunction } from "@uifabric/utilities";
import { ISearchResultStyles } from "./SearchResult.styles";
import { mergeStyleSets } from "@uifabric/styling";

interface ISearchResultClassNames {
    root?: string;
    label?: string;
    additional?: string;
    value?: string;
}

const getClassNames = memoizeFunction((styles : ISearchResultStyles, className?: string) : ISearchResultClassNames => {
    return mergeStyleSets({
        root: [styles.root, "search-result", className],
        label: [styles.label, "search-result-label"],
        additional: [styles.additional, "search-result-additional"],
        value: [styles.value, "search-result-value"],
    })
});

export { ISearchResultClassNames, getClassNames }