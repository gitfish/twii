import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, FontSizes, IStyle, IStyleSet } from "@uifabric/styling";

interface IPNRSearchRequestClassNames {
    editor: string;
    actions: string;
    summary: string;
    personEditor: string;
    personAgeRangeEditor: string;
}

const summary : IStyle = {
    flexWrap: "wrap",
    selectors: {
        ".definition-list": {
            paddingLeft: "8px",
            paddingRight: "8px"
        }
    }
};

const editor : IStyle = {
    selectors: {
        ".editor-section-column+.editor-section-column": {
            borderLeft: `1px solid ${DefaultPalette.neutralTertiary}`
        },
        ".editor-section-cell": {
            /*padding: "8px",*/
            selectors: {
                ".details": {
                    width: "100%",
                    /*boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)",*/
                    selectors: {
                        ".details-body": {
                            padding: "0px 8px"
                        }
                    }
                }
            }
        },
        ".editor-section+.editor-section": {
            selectors: {
                ".editor-section-cell": {
                    paddingTop: "0px"
                }
            }
        }
    }
};

const personEditor : IStyle = {

};

const personAgeRangeEditor : IStyle = {
    selectors: {
        ".age-to-field": {
            paddingLeft: "8px"
        }
    }
};

const actions : IStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "8px",
    paddingBottom: "8px",
    selectors: {
        ".pnr-search-action+.pnr-search-action": {
            marginLeft: "8px"
        }
    }
};

let merged : IPNRSearchRequestClassNames;

const getMerged = () => {
    if(!merged) {
        merged = mergeStyleSets({
            editor: editor,
            actions: actions,
            summary: summary,
            personEditor: personEditor,
            personAgeRangeEditor: personAgeRangeEditor
        });
    }
    return merged;
};

const ClassNames : IPNRSearchRequestClassNames = {
    get editor() {
        return getMerged().editor;
    },
    get actions() {
        return getMerged().actions;
    },
    get summary() {
        return getMerged().summary;
    },
    get personEditor() {
        return getMerged().personEditor;
    },
    get personAgeRangeEditor() {
        return getMerged().personAgeRangeEditor;
    }
};

export { ClassNames, editor }