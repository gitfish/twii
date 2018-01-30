import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, FontSizes, FontWeights, IStyle, IStyleSet } from "@uifabric/styling";

interface IWindowClassNames {
    portal: string;
}

const portal : IStyle = {
    backgroundColor: DefaultPalette.white,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "auto"
};

let merged : IWindowClassNames;

const getMerged = () => {
    if(!merged) {
        merged = mergeStyleSets({
            portal: portal
        });
    }
    return merged;
};

const ClassNames : IWindowClassNames = {
    get portal() {
        return getMerged().portal;
    }
}

export { IWindowClassNames, ClassNames, portal }

