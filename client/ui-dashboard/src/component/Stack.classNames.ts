import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IStackStyles } from "./Stack.styles";

interface IStackClassNames {
    root?: string;
    header?: string;
    tabBar?: string;
    actionBar?: string;
    action?: string;
    actionIcon?: string;
    closeAction?: string;
    closeActionIcon?: string;
    addAction?: string;
    tab?: string;
    tabTitleContainer?: string;
    tabTitle?: string;
    tabActionBar?: string;
    tabAction?: string;
    tabPanel?: string;
    body?: string;
    dragOverlay?: string;
    dragOverlayFeedback?: string;
}

const getClassNames = memoizeFunction((styles : IStackStyles, className?: string) => {
    return {
        root: mergeStyles("stack", className, styles.root),
        header: mergeStyles("stack-header", styles.header),
        tabBar: mergeStyles("stack-tab-bar", styles.tabBar),
        actionBar: mergeStyles("stack-action-bar", styles.actionBar),
        action: mergeStyles("stack-action", styles.action),
        actionIcon: mergeStyles("stack-action-icon", styles.actionIcon),
        closeAction: mergeStyles("stack-close-action", styles.closeActionIcon),
        closeActionIcon: mergeStyles("stack-close-action-icon", styles.closeActionIcon),
        addAction: mergeStyles("stack-add-action", styles.addAction),
        tab: mergeStyles("stack-tab", styles.tab),
        tabTitleContainer: mergeStyles("stack-tab-title-container", styles.tabTitleContainer),
        tabTitle: mergeStyles("stack-tab-title", styles.tabTitle),
        tabActionBar: mergeStyles("stack-tab-action-bar", styles.tabActionBar),
        tabAction: mergeStyles("stack-tab-action", styles.tabAction),
        tabPanel: mergeStyles("stack-tab-panel", styles.tabPanel),
        body: mergeStyles("stack-body", styles.body),
        dragOverlay: mergeStyles("stack-drag-overlay", styles.dragOverlay),
        dragOverlayFeedback: mergeStyles("stack-drag-overlay-feedback", styles.dragOverlayFeedback)
    };
});

export { IStackClassNames, getClassNames }