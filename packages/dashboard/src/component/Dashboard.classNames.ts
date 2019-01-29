import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IDashboardStyles } from "./Dashboard.styles";

interface IDashboardClassNames {
    root?: string;
    content?: string;
    overlay?: string;
}

const getClassNames = memoizeFunction((styles : IDashboardStyles, className?: string) => {
    return mergeStyleSets({
        root: ["dashboard", className, styles.root],
        content: ["dashboard-content", styles.content],
        overlay: ["dashboard-overlay", styles.overlay]
    });
});

export { IDashboardClassNames, getClassNames }