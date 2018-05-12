import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IAppFrameStyles } from "./AppFrame.styles";

interface IAppFrameClassNames {
    root?: string;
    frame?: string;
}

const getClassNames = memoizeFunction((styles : IAppFrameStyles, className?: string) => {
    return {
        root: mergeStyles("app-frame-root", className, styles.root),
        frame: mergeStyles("app-frame", styles.frame)
    };
});

export { IAppFrameClassNames, getClassNames }