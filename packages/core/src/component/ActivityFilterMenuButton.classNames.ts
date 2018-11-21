import { memoizeFunction } from "@uifabric/utilities";
import { mergeStyleSets } from "@uifabric/styling";
import { IActivityFilterMenuButtonStyles } from "./ActivityFilterMenuButton.styles";

interface IActivityFilterMenuButtonClassNames {
    root?: string;
    menu?: string;
    input?: string;
}

const getClassNames = memoizeFunction((styles : IActivityFilterMenuButtonStyles, className?: string) : IActivityFilterMenuButtonClassNames => {
    return mergeStyleSets({
        root: ["activity-filter-menu-button", className, styles.root],
        menu: ["activity-filter-menu-button-menu", styles.menu],
        input: ["activity-filter-menu-button-input", styles.input]
    });
});

export { IActivityFilterMenuButtonClassNames, getClassNames }