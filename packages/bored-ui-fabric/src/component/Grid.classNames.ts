import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IGridStyles } from "./Grid.styles";

interface IGridClassNames {
    root?: string;
    rowContainer?: string;
    row?: string;
    cell?: string;
    cellContent?: string;
}

const getClassNames = memoizeFunction((styles : IGridStyles, className?: string) => {
    return {
        root: mergeStyles("grid", className, styles.root),
        rowContainer: mergeStyles("grid-row-container", styles.rowContainer),
        row: mergeStyles("grid-row", styles.row),
        cell: mergeStyles("grid-cell", styles.cell),
        cellContent: mergeStyles("grid-cell-content", styles.cellContent)
    };
});

export { IGridClassNames, getClassNames }