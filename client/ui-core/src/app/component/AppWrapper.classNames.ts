import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IAppWrapperStyles } from "./AppWrapper.styles";

interface IAppWrapperClassNames {
    root?: string;
    header?: string;
    title?: string;
    brand?: string;
    headerNear?: string;
    headerFar?: string;
    headerItem?: string;
    headerItemError?: string;
    main?: string;
}

const getClassNames = memoizeFunction((styles : IAppWrapperStyles, className?: string) => {
    return {
        root: mergeStyles("app-wrapper", className, styles.root),
        header: mergeStyles("app-header", styles.header),
        title: mergeStyles("app-title", styles.title),
        brand: mergeStyles("app-brand", styles.brand),
        headerNear: mergeStyles("app-header-near", styles.headerNear),
        headerFar: mergeStyles("app-header-far", styles.headerFar),
        headerItem: mergeStyles("app-header-item", styles.headerItem),
        headerItemError: mergeStyles("app-header-item-error", styles.headerItemError),
        main: mergeStyles("app-main", styles.main)
    };
});

export { IAppWrapperClassNames, getClassNames }