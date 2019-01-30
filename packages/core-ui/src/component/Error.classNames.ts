import { mergeStyleSets } from "@uifabric/styling";
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
    return mergeStyleSets({
        root: ["error", className, styles.root],
        compact: ["compact-error", className, styles.compact],
        message: ["error-message", styles.message],
        item: ["error-item", styles.item],
        itemTitle: ["error-item-title", styles.itemTitle],
        itemValue: ["error-item-value", styles.itemValue]
    });
});

export { IErrorClassNames, getClassNames }