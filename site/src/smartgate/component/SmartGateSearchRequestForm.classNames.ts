import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { ISmartGateSearchRequestFormStyles } from "./SmartGateSearchRequestForm.styles";

interface ISmartGateSearchRequestFormClassNames {
    root?: string;
    editor?: string;
    actions?: string;
}

const getClassNames = memoizeFunction((styles : ISmartGateSearchRequestFormStyles, className?: string) => {
    return {
        root: mergeStyles("smart-gate-search-request-form", className, styles.root),
        editor: mergeStyles("smart-gate-search-request-editor", styles.editor),
        actions: mergeStyles("smart-gate-search-request-actions", styles.actions)
    };
});

export { ISmartGateSearchRequestFormClassNames, getClassNames }