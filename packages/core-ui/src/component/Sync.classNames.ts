import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { ISyncStyles } from "./Sync.styles";

interface ISyncClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : ISyncStyles, className?: string) : ISyncClassNames => {
    return mergeStyleSets({
        root: ["sync", styles.root, className]
    });
});

export { ISyncClassNames, getClassNames }