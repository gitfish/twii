import { mergeStyleSets } from "@uifabric/styling";
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
    return mergeStyleSets({
        root: ["combo-box", className, styles.root],
        callout: ["combo-box-callout", styles.callout],
        list: ["combo-box-list", styles.list],
        listItem: ["combo-box-list-item", styles.listItem],
        inputContainer: ["combo-box-input-container", styles.inputContainer],
        input: ["combo-box-input", styles.input],
        selectControl: ["combo-box-select-control", styles.selectControl],
        selectControlIcon: ["combo-box-select-control-icon", styles.selectControlIcon]
    });
});

export { IComboBoxClassNames, getClassNames }