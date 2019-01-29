import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IWindowStyles } from "./Window.styles";

interface IWindowClassNames {
    root?: string;
    header?: string;
    iconContainer?: string;
    titleContainer?: string;
    title?: string;
    actionBar?: string;
    action?: string;
    body?: string;
    resize?: string;
}

const getClassNames = memoizeFunction((styles : IWindowStyles, className?: string) => {
    return mergeStyleSets({
        root: ["window", className, styles.root],
        header: ["window-header", styles.header],
        iconContainer: ["window-icon-container", styles.iconContainer],
        titleContainer: ["window-title-container", styles.titleContainer],
        title: ["window-title", styles.title],
        actionBar: ["window-action-bar", styles.actionBar],
        action: ["window-action", styles.action],
        body: ["window-body", styles.body],
        resize: ["window-resize", styles.resize]
    });
});

export { IWindowClassNames, getClassNames }