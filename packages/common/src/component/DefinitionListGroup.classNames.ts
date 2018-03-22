import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IDefinitionListGroupStyles } from "./DefinitionListGroup.styles";

interface IDefinitionListGroupClassNames {
    root?: string;
    list?: string;
}

const getClassNames = memoizeFunction((styles : IDefinitionListGroupStyles, className?: string) : IDefinitionListGroupClassNames => {
    return {
        root: mergeStyles("definition-list-group", className, styles.root),
        list: mergeStyles("definition-list-group-list", styles.list)
    };
});

export { IDefinitionListGroupClassNames, getClassNames }