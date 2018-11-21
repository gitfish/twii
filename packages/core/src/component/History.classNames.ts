import { memoizeFunction } from "@uifabric/utilities";
import { IHistoryStyles } from "./History.styles";
import { mergeStyleSets } from "@uifabric/styling";

interface IHistoryClassNames {
    root?: string;
    empty?: string;
    cell?: string;
}

const getClassNames = memoizeFunction((styles : IHistoryStyles, className?: string) : IHistoryClassNames => {
    return mergeStyleSets({
        root: ["history", className, styles.root],
        empty: ["history-empty", styles.empty],
        cell: ["history-cell", styles.cell]
    })
});

export { IHistoryClassNames, getClassNames }