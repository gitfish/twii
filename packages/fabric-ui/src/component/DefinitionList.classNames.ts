import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IDefinitionListStyles } from "./DefinitionList.styles";

interface IDefinitionListClassNames {
    root?: string;
    title?: string;
    data?: string;
}

const getClassNames = memoizeFunction((styles : IDefinitionListStyles, className?: string) : IDefinitionListClassNames => {
    return {
        root: mergeStyles("definition-list", className, styles.root),
        title: mergeStyles("definition-list-title", styles.title),
        data: mergeStyles("definition-list-data", styles.data)
    };
});

export { IDefinitionListClassNames, getClassNames }