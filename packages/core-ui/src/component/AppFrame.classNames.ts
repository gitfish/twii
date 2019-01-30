import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IAppFrameStyles } from "./AppFrame.styles";

interface IAppFrameClassNames {
    root?: string;
    frame?: string;
}

const getClassNames = memoizeFunction((styles : IAppFrameStyles, className?: string) => {
    return mergeStyleSets({
        root: ["app-frame-root", className, styles.root],
        frame: ["app-frame", styles.frame]
    });
});

export { IAppFrameClassNames, getClassNames }