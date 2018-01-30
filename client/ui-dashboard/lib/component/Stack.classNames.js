"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styling_1 = require("@uifabric/styling");
var utilities_1 = require("@uifabric/utilities");
var getClassNames = utilities_1.memoizeFunction(function (styles, className) {
    return {
        root: styling_1.mergeStyles("stack", className, styles.root),
        header: styling_1.mergeStyles("stack-header", styles.header),
        tabBar: styling_1.mergeStyles("stack-tab-bar", styles.tabBar),
        actionBar: styling_1.mergeStyles("stack-action-bar", styles.actionBar),
        action: styling_1.mergeStyles("stack-action", styles.action),
        addAction: styling_1.mergeStyles("stack-add-action", styles.addAction),
        tab: styling_1.mergeStyles("stack-tab", styles.tab),
        tabTitleContainer: styling_1.mergeStyles("stack-tab-title-container", styles.tabTitleContainer),
        tabTitle: styling_1.mergeStyles("stack-tab-title", styles.tabTitle),
        tabActionBar: styling_1.mergeStyles("stack-tab-action-bar", styles.tabActionBar),
        tabAction: styling_1.mergeStyles("stack-tab-action", styles.tabAction),
        tabPanel: styling_1.mergeStyles("stack-tab-panel", styles.tabPanel),
        body: styling_1.mergeStyles("stack-body", styles.body),
        dragOverlay: styling_1.mergeStyles("stack-drag-overlay", styles.dragOverlay),
        dragOverlayFeedback: styling_1.mergeStyles("stack-drag-overlay-feedback", styles.dragOverlayFeedback)
    };
});
exports.getClassNames = getClassNames;
//# sourceMappingURL=Stack.classNames.js.map