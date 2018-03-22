import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IMomentFieldStyles } from "./MomentField.styles";

interface IMomentFieldClassNames {
    root?: string;
    inputContainer?: string;
    textField?: string;
}

const getClassNames = memoizeFunction((styles : IMomentFieldStyles, className?: string) => {
    return {
        root: mergeStyles("moment-field", className, styles.root),
        inputContainer: mergeStyles("moment-field-input-container", styles.inputContainer),
        textField: mergeStyles("moment-field-text-field", styles.textField)
    };
});

export { IMomentFieldClassNames, getClassNames }