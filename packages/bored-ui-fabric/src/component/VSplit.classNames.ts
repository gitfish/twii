import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IVSplitStyles } from "./VSplit.styles";

interface IVSplitClassNames {
    root?: string;
    splitter?: string;
    splitterHandle?: string;
    topPane?: string;
    topContent?: string;
    bottomPane?: string;
    bottomContent?: string;
}

const getClassNames = memoizeFunction((styles : IVSplitStyles, className?: string) => {
    return {
        root: mergeStyles("vsplit", styles.root, className),
        splitter: mergeStyles("vsplit-splitter", styles.splitter),
        splitterHandle: mergeStyles("vsplit-splitter-content", styles.splitterHandle),
        topPane: mergeStyles("vsplit-top-pane", styles.topPane),
        topContent: mergeStyles("vsplit-top-content", styles.topContent),
        bottomPane: mergeStyles("vsplit-bottom-pane", styles.bottomPane),
        bottomContent: mergeStyles("vsplit-bottom-content", styles.bottomContent)
    }
});

export { IVSplitClassNames, getClassNames }