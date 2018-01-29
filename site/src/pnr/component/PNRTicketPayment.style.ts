import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, FontSizes, IStyle, IStyleSet } from "@uifabric/styling";

interface IPNRSearchResultsClassNames {
    container: string;
    header: string;
    body: string;
    summary: string;
    list: string;
    listView: string;
}

const summary : IStyle = {
    flexWrap: "wrap",
    overflow: "auto",
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    selectors: {
        ".definition-list": {
            paddingLeft: "8px",
            paddingRight: "8px"
        }
    }
};

const container : IStyle = {
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
};

const header : IStyle = {
    position: "absolute",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    top: "0px",
    right: "0px",
    left: "0px",
    height: "32px"
};

const body : IStyle = {
    position: "absolute",
    top: "32px",
    right: "0px",
    left: "0px",
    bottom: "0px"
};

const list : IStyle = {
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
};

const listCommandBar : IStyle = {
    position: "absolute",
    top: "0px",
    height: "28px",
    right: "0px",
    left: "0px",
};

const listView : IStyle = {
    position: "absolute",
    top: "28px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    overflow: "auto"
};

let merged : IPNRSearchResultsClassNames;
const getMerged = () => {
    if(!merged) {
        merged = mergeStyleSets({
            container: container,
            header: header,
            body: body,
            summary: summary,
            list: list,
            listView: listView
        });
    }
    return merged;
};

const ClassNames : IPNRSearchResultsClassNames = {
    get container() {
        return getMerged().container;
    },
    get header() {
        return getMerged().header;
    },
    get body() {
        return getMerged().body;
    },
    get summary() {
        return getMerged().summary;
    },
    get list() {
        return getMerged().list;
    },
    get listView() {
        return getMerged().listView;
    }
};

export { ClassNames, summary }