import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IGridStyles } from "./Grid.styles";

interface IGridClassNames {
    root?: string;
    cell?: string;
    window?: string;
    windowHeader?: string;
    windowTitleContainer?: string;
    windowTitle?: string;
    windowActionBar?: string;
    windowAction?: string;
    windowBody?: string;
}

const getClassNames = memoizeFunction((styles : IGridStyles, className?: string) => {
    return {
        root: mergeStyles("grid", className, styles.root),
        cell: mergeStyles("grid-cell", styles.cell),
        window: mergeStyles("grid-window", styles.window),
        windowHeader: mergeStyles("grid-window-header", styles.windowHeader),
        windowTitleContainer: mergeStyles("grid-window-title-container", styles.windowTitleContainer),
        windowTitle: mergeStyles("grid-window-title", styles.windowTitle),
        windowActionBar: mergeStyles("grid-window-action-bar", styles.windowActionBar),
        windowAction: mergeStyles("grid-window-action", styles.windowAction),
        windowBody: mergeStyles("grid-window-body", styles.windowBody)
    };
});

export { IGridClassNames, getClassNames }