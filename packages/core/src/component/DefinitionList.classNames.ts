import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IDefinitionListStyles } from "./DefinitionList.styles";

interface IDefinitionListClassNames {
    root?: string;
    title?: string;
    data?: string;
}

const getClassNames = memoizeFunction((styles : IDefinitionListStyles, className?: string) : IDefinitionListClassNames => {
    return mergeStyleSets({
        root: ["definition-list", className, styles.root],
        title: ["definition-list-title", styles.title],
        data: ["definition-list-data", styles.data]
    });
});

export { IDefinitionListClassNames, getClassNames }