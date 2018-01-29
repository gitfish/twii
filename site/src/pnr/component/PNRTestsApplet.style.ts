import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, FontSizes, IStyle, IStyleSet } from "@uifabric/styling";

interface IPNRSearchAppletClassNames {
    historyMenu: string;
}

const historyMenu : IStyle = {
    overflow: "auto",
    maxHeight: "80vh",
    selectors: {
        ".pnr-search-history-item-button": {
            height: "28px",
            padding: "2px 4px",
            backgroundColor: DefaultPalette.white,
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            selectors: {
                ".pnr-search-request-summary": {
                    cursor: "pointer",
                    selectors: {
                        "dl, dt, dd, label": {
                            cursor: "pointer"
                        }
                    }
                },
                ":hover": {
                    backgroundColor: DefaultPalette.neutralLight
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

let merged : IPNRSearchAppletClassNames;

const getMerged = () => {
    if(!merged) {
        merged = mergeStyleSets({
            historyMenu
        });
    }
    return merged;
};

const ClassNames : IPNRSearchAppletClassNames = {
    get historyMenu() {
        return getMerged().historyMenu;
    }
};

export { ClassNames, historyMenu }