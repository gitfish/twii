import { memoizeFunction } from "@uifabric/utilities";
import { ISearchableValueStyles } from "./SearchableValue.styles";
import { mergeStyleSets } from "@uifabric/styling";

interface ISearchableValueClassNames {
    root?: string;
}

const getClassNames = memoizeFunction((styles : ISearchableValueStyles, className?: string) : ISearchableValueClassNames => {
    return mergeStyleSets({
        root: ["searchable-value", styles.root, className]
    })
});

export { ISearchableValueClassNames, getClassNames }