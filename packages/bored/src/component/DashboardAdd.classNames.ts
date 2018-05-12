import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IDashboardAddStyles } from "./DashboardAdd.styles";

interface IDashboardAddClassNames {
    root?: string;
    editor?: string;
    actions?: string;
    action?: string;
}

const getClassNames = memoizeFunction((styles : IDashboardAddStyles, className?: string) : IDashboardAddClassNames => {
    return {
        root: mergeStyles("dashboard-add", styles.root, className),
        editor: mergeStyles("dashboard-add-editor", styles.editor),
        actions: mergeStyles("dashboard-add-actions", styles.actions),
        action: mergeStyles("dasboard-add-action", styles.action)
    };
});

export { IDashboardAddClassNames, getClassNames }