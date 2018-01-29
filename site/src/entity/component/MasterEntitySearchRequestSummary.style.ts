import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, FontWeights, IStyle, IStyleSet } from "@uifabric/styling";

interface IMasterEntitySearchRequestSummaryClassNames {
    root: string;
}

const root : IStyle = Object.assign({},
    DefaultFontStyles.small,
    {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        selectors: {
            ".definition-list": {
                paddingLeft: "8px",
                paddingRight: "8px"
            }
        }
    }
);

let classNames : IMasterEntitySearchRequestSummaryClassNames;

const getClassNames = () => {
    if(!classNames) {
        classNames = mergeStyleSets({
            root: root
        });
    }
    return classNames;
};

export { getClassNames, root }