import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { ISyncStyles } from "./Sync.styles";

interface ISyncClassNames {
    root?: string;
}

const getClassNames = ((styles : ISyncStyles, className?: string) : ISyncClassNames => {
    return {
        root: mergeStyles("sync", styles.root, className),
    };
});

export { ISyncClassNames, getClassNames }