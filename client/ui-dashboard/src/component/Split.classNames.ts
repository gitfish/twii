import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IHSplitStyles, IVSplitStyles } from "./Split.styles";

interface IHSplitClassNames {
    root?: string;
    splitter?: string;
    leftPane?: string;
    rightPane?: string;
}

interface IVSplitClassNames {
    root?: string;
    splitter?: string;
    topPane?: string;
    bottomPane?: string;
}

const getHSplitClassNames = memoizeFunction((styles : IHSplitStyles, className?: string) => {
    return {
        root: mergeStyles("hsplit", styles.root, className),
        splitter: mergeStyles("hsplit-splitter", styles.splitter),
        leftPane: mergeStyles("hsplit-left-pane", styles.leftPane),
        rightPane: mergeStyles("hsplit-right-pane", styles.rightPane)
    };
});

const getVSplitClassNames = memoizeFunction((styles : IVSplitStyles, className?: string) => {
    return {
        root: mergeStyles("vsplit", styles.root, className),
        splitter: mergeStyles("vsplit-splitter", styles.splitter),
        topPane: mergeStyles("vsplit-top-pane", styles.topPane),
        bottomPane: mergeStyles("vsplit-bottom-pane", styles.bottomPane)
    }
});

export { IHSplitClassNames, IVSplitClassNames, getHSplitClassNames, getVSplitClassNames }
