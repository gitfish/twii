import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IAppViewStyles } from "./AppView.styles";

interface IAppViewClassNames {
    root?: string;
    title?: string;
    menu?: string;
    menuGlass?: string;
    menuContent?: string;
    menuContentNear?: string;
    menuContentFar?: string;
    menuItem?: string;
    menuItemIcon?: string;
    main?: string;
}

const getClassNames = memoizeFunction((styles : IAppViewStyles, className?: string) => {
    return {
        root: mergeStyles("app-view", className, styles.root),
        menu: mergeStyles("app-view-menu", styles.menu),
        menuGlass: mergeStyles("app-view-menu-glass", styles.menuGlass),
        menuContent: mergeStyles("app-view-menu-content", styles.menuContent),
        title: mergeStyles("app-view-title", styles.title),
        menuContentNear: mergeStyles("app-view-menu-content-near", styles.menuContentNear),
        menuContentFar: mergeStyles("app-view-menu-far", styles.menuContentFar),
        menuItem: mergeStyles("app-view-menu-item", styles.menuItem),
        menuItemIcon: mergeStyles("app-view-menu-item-icon", styles.menuItemIcon),
        main: mergeStyles("app-view-main", styles.main)
    };
});

export { IAppViewClassNames, getClassNames }