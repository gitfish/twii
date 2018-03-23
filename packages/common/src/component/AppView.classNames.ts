import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IAppViewStyles } from "./AppView.styles";

interface IAppViewClassNames {
    root?: string;
    commandBar?: string;
    main?: string;
}

const getClassNames = memoizeFunction((styles : IAppViewStyles, className?: string) : IAppViewClassNames => {
    return {
        root: mergeStyles("app-view", styles.root, className),
        commandBar: mergeStyles("app-view-command-bar", styles.commandBar),
        main: mergeStyles("app-view-main", styles.main)
    };
});

export { IAppViewClassNames, getClassNames }