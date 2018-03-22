import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { INavigationViewStyles } from "./NavigationView.styles";

interface INavigationViewClassNames {
    root?: string;
    title?: string;
    menu?: string;
    menuGlass?: string;
    menuContent?: string;
    menuContentNear?: string;
    menuContentFar?: string;
    menuItemContainer?: string;
    menuItem?: string;
    menuItemTitleContainer?: string;
    menuItemIconContainer?: string;
    main?: string;
}

const getClassNames = memoizeFunction((styles : INavigationViewStyles, className?: string) => {
    return {
        root: mergeStyles("navigation-view", className, styles.root),
        menu: mergeStyles("navigation-view-menu", styles.menu),
        menuGlass: mergeStyles("navigation-view-menu-glass", styles.menuGlass),
        menuContent: mergeStyles("navigation-view-menu-content", styles.menuContent),
        title: mergeStyles("navigation-view-title", styles.title),
        menuContentNear: mergeStyles("navigation-view-menu-content-near", styles.menuContentNear),
        menuContentFar: mergeStyles("navigation-view-menu-far", styles.menuContentFar),
        menuItemContainer: mergeStyles("navigation-view-menu-item-container", styles.menuItemContainer),
        menuItem: mergeStyles("navigation-view-menu-item", styles.menuItem),
        menuItemTitleContainer: mergeStyles("navigation-view-menu-item-title-container", styles.menuItemTitleContainer),
        menuItemIconContainer: mergeStyles("navigation-view-menu-item-icon-container", styles.menuItemIconContainer),
        main: mergeStyles("navigation-view-main", styles.main)
    };
});

export { INavigationViewClassNames, getClassNames }