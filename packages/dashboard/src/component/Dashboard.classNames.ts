import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IDashboardStyles } from "./Dashboard.styles";

interface IDashboardClassNames {
    root?: string;
    overlay?: string;
    content?: string;
}

const getClassNames = memoizeFunction((styles : IDashboardStyles, className?: string) => {
    return {
        root: mergeStyles("dashboard", className, styles.root),
        overlay: mergeStyles("dashboard-overlay", styles.overlay),
        content: mergeStyles("dashboard-content", styles.content)
    };
});

export { IDashboardClassNames, getClassNames }