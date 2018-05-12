import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IWindowPortalStyles } from "./WindowPortal.styles";

interface IWindowPortalClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : IWindowPortalStyles, className?: string) => {
    return {
        root: mergeStyles("window-portal", className, styles.root)
    };
});

export { IWindowPortalClassNames, getClassNames }