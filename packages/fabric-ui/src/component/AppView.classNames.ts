import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IAppViewStyles } from "./AppView.styles";

interface IAppViewClassNames {
    root?: string;
    menuContainer?: string;
    main?: string;
}

const getClassNames = memoizeFunction((styles : IAppViewStyles, className?: string) : IAppViewClassNames => {
    return {
        root: mergeStyles("app-view", styles.root, className),
        menuContainer: mergeStyles("app-view-menu-container", styles.menuContainer),
        main: mergeStyles("app-view-main", styles.main)
    };
});

export { IAppViewClassNames, getClassNames }