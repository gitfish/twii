import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, FontWeights, IStyle, IStyleSet } from "@uifabric/styling";

interface IDefinitionListClassNames {
    root: string;
}

const root : IStyle = {
    cursor: "inherit",
    selectors: {
        "&.inline": {
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: "0px",
            marginBottom: "0px",
            selectors: {
                "label": {
                    cursor: "inherit"
                },
                "dt": {
                    fontWeight: FontWeights.semibold,
                    margin: "0px",
                    cursor: "inherit"
                },
                "dd": {
                    fontWeight: FontWeights.light,
                    marginLeft: "8px",
                    cursor: "inherit"
                }
            }
        }
    }
};

let merged : IDefinitionListClassNames;

const getMerged = () => {
    if(!merged) {
        merged = mergeStyleSets({
            root: root
        });
    }
    return merged;
};

const ClassNames : IDefinitionListClassNames = {
    get root() {
        return getMerged().root;
    }
};

export { ClassNames, root }