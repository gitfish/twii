import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IHSplitStyles } from "./HSplit.styles";

interface IHSplitClassNames {
    root?: string;
    splitter?: string;
    splitterContent?: string;
    leftPane?: string;
    leftContent?: string;
    rightPane?: string;
    rightContent?: string;
}

const getClassNames = memoizeFunction((styles : IHSplitStyles, className?: string) => {
    return {
        root: mergeStyles("hsplit", styles.root, className),
        splitter: mergeStyles("hsplit-splitter", styles.splitter),
        splitterContent: mergeStyles("hsplit-splitter-content", styles.splitterContent),
        leftPane: mergeStyles("hsplit-left-pane", styles.leftPane),
        leftContent: mergeStyles("hsplit-left-content", styles.leftContent),
        rightPane: mergeStyles("hsplit-right-pane", styles.rightPane),
        rightContent: mergeStyles("hsplit-right-content", styles.rightContent)
    };
});

export { IHSplitClassNames, getClassNames }