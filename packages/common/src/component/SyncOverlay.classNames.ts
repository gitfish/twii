import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { ISyncOverlayStyles } from "./SyncOverlay.styles";

interface ISyncOverlayClassNames {
    root?: string;
    content?: string;
}

const getClassNames = ((styles : ISyncOverlayStyles, className?: string) : ISyncOverlayClassNames => {
    return {
        root: mergeStyles("sync-overlay", styles.root, className),
        content: mergeStyles("sync-overlay-content", styles.content)
    };
});

export { ISyncOverlayClassNames, getClassNames }

