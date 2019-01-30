import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IAppViewStyles } from "./AppView.styles";

interface IAppViewClassNames {
    root?: string;
    rootMenuContainer?: string;
    menuContainer?: string;
    main?: string;
    mainWithMenu?: string;
}

const getClassNames = memoizeFunction((styles : IAppViewStyles, className?: string) : IAppViewClassNames => {
    return mergeStyleSets({
        root: ["app-view", styles.root, className],
        rootMenuContainer: ["app-view-menu-container--root", styles.rootMenuContainer],
        menuContainer: ["app-view-menu-container", styles.menuContainer],
        main: ["app-view-main", styles.main],
        mainWithMenu: ["app-view-main--with-menu", styles.mainWithMenu]
    });
});

export { IAppViewClassNames, getClassNames }