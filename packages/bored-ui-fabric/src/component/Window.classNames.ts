import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IWindowStyles } from "./Window.styles";

interface IWindowClassNames {
    root?: string;
    header?: string;
    titleContainer?: string;
    title?: string;
    actionBar?: string;
    action?: string;
    body?: string;
}

const getClassNames = memoizeFunction((styles : IWindowStyles, className?: string) => {
    return {
        root: mergeStyles("window", className, styles.root),
        header: mergeStyles("window-header", styles.header),
        titleContainer: mergeStyles("window-title-container", styles.titleContainer),
        title: mergeStyles("window-title", styles.title),
        actionBar: mergeStyles("window-action-bar", styles.actionBar),
        action: mergeStyles("window-action", styles.action),
        body: mergeStyles("window-body", styles.body)
    };
});

export { IWindowClassNames, getClassNames }