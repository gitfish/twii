import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, FontWeights, IStyle, IStyleSet } from "@uifabric/styling";

interface IUserProfileClassNames {
    root: string;
}

const root : IStyle = {
    padding: 8,
    selectors: {
        ".name": {
            fontWeight: FontWeights.semibold
        }
    }
};

let merged : IUserProfileClassNames;
const getMerged = () => {
    if(!merged) {
        merged = mergeStyleSets({
            root: root
        });
    }
    return merged;
};

const ClassNames : IUserProfileClassNames = {
    get root() {
        return getMerged().root;
    }
};

export { ClassNames, root }