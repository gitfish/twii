import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IComboBoxStyles } from "./ComboBox.styles";

interface IComboBoxClassNames {
    root?: string;
    callout?: string;
    list?: string;
    listItem?: string;
    inputContainer?: string;
    input?: string;
    selectControl?: string;
    selectControlIcon?: string;
}

const getClassNames = memoizeFunction((styles : IComboBoxStyles, className?: string) : IComboBoxClassNames => {
    return {
        root: mergeStyles("combo-box", className, styles.root),
        callout: mergeStyles("combo-box-callout", styles.callout),
        list: mergeStyles("combo-box-list", styles.list),
        listItem: mergeStyles("combo-box-list-item", styles.listItem),
        inputContainer: mergeStyles("combo-box-input-container", styles.inputContainer),
        input: mergeStyles("combo-box-input", styles.input),
        selectControl: mergeStyles("combo-box-select-control", styles.selectControl),
        selectControlIcon: mergeStyles("combo-box-select-control-icon", styles.selectControlIcon)
    };
});

export { IComboBoxClassNames, getClassNames }