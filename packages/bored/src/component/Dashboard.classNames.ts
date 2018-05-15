import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IDashboardStyles } from "./Dashboard.styles";

interface IDashboardClassNames {
    root?: string;
    overlay?: string;
    portalRoot?: string;
}

const getClassNames = memoizeFunction((styles : IDashboardStyles, className?: string) => {
    return {
        root: mergeStyles("dashboard", className, styles.root),
        overlay: mergeStyles("dashboard-overlay", styles.overlay)
    };
});

export { IDashboardClassNames, getClassNames }