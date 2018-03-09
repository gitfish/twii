import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IAppViewStyles } from "./AppView.styles";

interface IAppViewClassNames {
    root?: string;
    menu?: string;
    title?: string;
    headerNear?: string;
    headerFar?: string;
    headerItem?: string;
    headerItemError?: string;
    main?: string;
}

const getClassNames = memoizeFunction((styles : IAppViewStyles, className?: string) => {
    return {
        root: mergeStyles("app-view", className, styles.root),
        menu: mergeStyles("app-view-menu", styles.menu),
        title: mergeStyles("app-view-title", styles.title),
        menuNear: mergeStyles("app-view-menu-near", styles.menuNear),
        menuFar: mergeStyles("app-view-menu-far", styles.menuFar),
        menuItem: mergeStyles("app-view-menu-item", styles.menuItem),
        menuItemError: mergeStyles("app-view-menu-item-error", styles.menuItemError),
        main: mergeStyles("app-view-main", styles.main)
    };
});

export { IAppViewClassNames, getClassNames }