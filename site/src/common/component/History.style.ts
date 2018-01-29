import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, IStyle, IStyleSet } from "@uifabric/styling";

interface IHistoryClassNames {
    list: string;
    listEmpty: string;
    listCell: string;
}

const list : IStyle = {
    selectors: {
        "$listCell+$listCell": {
            borderTop: `1px dashed ${DefaultPalette.neutralTertiary}`
        }
    }
};

const listEmpty : IStyle = {
    padding: "8px"
};

const listCell : IStyle = {
    padding: "8px",
    selectors: {
        "&.selectable": {
            cursor: "pointer"
        },
        "&:hover": {
            backgroundColor: DefaultPalette.neutralLight
        }
    }
};

let merged : IHistoryClassNames;

const getMerged = () => {
    if(!merged) {
        merged = mergeStyleSets({
            list,
            listEmpty,
            listCell
        });
    }
    return merged;
};

const ClassNames : IHistoryClassNames = {
    get list() {
        return getMerged().list;
    },
    get listEmpty() {
        return getMerged().listEmpty;
    },
    get listCell() {
        return getMerged().listCell;
    }
}

export { ClassNames, listCell }