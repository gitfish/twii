import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListStyles } from "./List.styles";

interface IListClassNames {
    root?: string;
    header?: string;
    action?: string;
    nearActionBar?: string;
    farActionBar?: string;
    body?: string;
    window?: string;
    windowHeader?: string;
    windowTitleContainer?: string;
    windowTitle?: string;
    windowActionBar?: string;
    windowAction?: string;
    windowBody?: string;
    appender?: string;
}

const getClassNames = memoizeFunction((styles : IListStyles, className?: string) => {
    return {
        root: mergeStyles("list", className, styles.root),
        header: mergeStyles("list-header", styles.header),
        action: mergeStyles("list-action", styles.action),
        nearActionBar: mergeStyles("list-near-action-bar", styles.nearActionBar),
        farActionBar: mergeStyles("list-far-action-bar", styles.farActionBar),
        body: mergeStyles("list-body", styles.body),
        window: mergeStyles("list-window", styles.window),
        windowHeader: mergeStyles("list-window-header", styles.windowHeader),
        windowTitleContainer: mergeStyles("list-window-title-container", styles.windowTitleContainer),
        windowTitle: mergeStyles("list-window-title", styles.windowTitle),
        windowActionBar: mergeStyles("list-window-action-bar", styles.windowActionBar),
        windowAction: mergeStyles("list-window-action", styles.windowAction),
        windowBody: mergeStyles("list-window-body", styles.windowBody),
        appender: mergeStyles("list-appender", styles.appender)
    };
});

export { IListClassNames, getClassNames }