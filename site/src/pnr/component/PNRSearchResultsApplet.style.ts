import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, FontSizes, IStyle, IStyleSet } from "@uifabric/styling";

interface IPNRSearchResultsAppletClassNames {
    root: string,
    header: string,
    body: string
}

const root : IStyle = {
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
};

const header : IStyle = {
    position: "absolute",
    top: "0px",
    right: "0px",
    left: "0px",
    height: "28px"
};

const body : IStyle = {
    position: "absolute",
    top: "28px",
    right: "0px",
    bottom: "0px",
    left: "0px"
};

let merged : IPNRSearchResultsAppletClassNames;

const getMerged = () => {
    if(!merged) {
        merged = mergeStyleSets({
            root,
            header,
            body
        });
    }
    return merged;
};

const ClassNames : IPNRSearchResultsAppletClassNames = {
    get root() {
        return getMerged().root;
    },
    get header() {
        return getMerged().header;
    },
    get body() {
        return getMerged().body;
    }
};

export { ClassNames, root, header, body }