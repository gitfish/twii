import { memoizeFunction } from "@uifabric/utilities";
import { mergeStyleSets } from "@uifabric/styling";
import { ISearchInputStyles } from "./SearchInput.styles";

interface ISearchInputClassNames {
    root?: string;
    menuWrapper?: string;
}

const getClassNames = memoizeFunction((styles : ISearchInputStyles, className?: string) : ISearchInputClassNames => {
    return mergeStyleSets({
        root: ["search-input-container", styles.root, className],
        menuWrapper: ["search-input-container-menu-wrapper", styles.menuWrapper]
    });
});

export { ISearchInputClassNames, getClassNames }