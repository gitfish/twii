import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { ISyncOverlayStyles } from "./SyncOverlay.styles";

interface ISyncOverlayClassNames {
    root?: string;
    content?: string;
}

const getClassNames = memoizeFunction((styles : ISyncOverlayStyles, className?: string) : ISyncOverlayClassNames => {
    return mergeStyleSets({
        root: ["sync-overlay", styles.root, className],
        content: ["sync-overlay-content", styles.content]
    });
});

export { ISyncOverlayClassNames, getClassNames }

