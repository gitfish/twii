import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, FontWeights, IStyle, IStyleSet } from "@uifabric/styling";

interface IDefinitionListGroupClassNames {
    root: string;
}

const root : IStyle = Object.assign({},
    DefaultFontStyles.small,
    {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        selectors: {
            ".definition-list+.definition-list": {
                paddingLeft: "8px"
            }
        }
    }
);

let merged : IDefinitionListGroupClassNames;

const getMerged = () => {
    if(!merged) {
        merged = mergeStyleSets({
            root: root
        });
    }
    return merged;
};

const ClassNames : IDefinitionListGroupClassNames = {
    get root() {
        return getMerged().root;
    }
}

export { ClassNames, root }