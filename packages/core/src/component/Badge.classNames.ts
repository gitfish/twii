import { memoizeFunction } from "@uifabric/utilities";
import { IBadgeStyles } from "./Badge.styles";
import { mergeStyleSets } from "@uifabric/styling";

interface IBadgeClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : IBadgeStyles, className?: string) : IBadgeClassNames => {
    return mergeStyleSets({
        root: ["badge", styles.root, className]
    })
});

export { IBadgeClassNames, getClassNames }