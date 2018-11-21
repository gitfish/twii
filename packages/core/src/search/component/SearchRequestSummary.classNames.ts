import { ISearchRequestSummaryStyles } from "./SearchRequestSummary.styles";
import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISearchRequestSummaryClassNames {
    root?: string;
    op?: string;
    group?: string;
    value?: string;
}

const getClassNames = memoizeFunction((styles : ISearchRequestSummaryStyles, className?: string) : ISearchRequestSummaryClassNames => {
    return mergeStyleSets({
        root: ["search-request-summary", styles.root, className],
        op: ["search-request-op", styles.op],
        group: ["search-request-summary-group", styles.group],
        value: ["search-request-summary-value", styles.value]
    });
});

export { ISearchRequestSummaryClassNames, getClassNames }