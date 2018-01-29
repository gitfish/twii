import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IErrorStyles } from "./Error.styles";

interface IErrorClassNames {
    root?: string;
    compact?: string;
    message?: string;
    item?: string;
    itemTitle?: string;
    itemValue?: string;
}

const getClassNames = memoizeFunction((styles : IErrorStyles, className?: string) => {
    return {
        root: mergeStyles("error", className, styles.root),
        compact: mergeStyles("compact-error", className, styles.compact),
        message: mergeStyles("error-message", styles.message),
        item: mergeStyles("error-item", styles.item),
        itemTitle: mergeStyles("error-item-title", styles.itemTitle),
        itemValue: mergeStyles("error-item-value", styles.itemValue)
    };
});

export { IErrorClassNames, getClassNames }