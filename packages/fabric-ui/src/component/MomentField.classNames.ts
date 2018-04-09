import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IMomentFieldStyles } from "./MomentField.styles";

interface IMomentFieldClassNames {
    root?: string;
    inputContainer?: string;
    textField?: string;
    calendarButtonContainer?: string;
    calendarButton?: string;
}

const getClassNames = memoizeFunction((styles : IMomentFieldStyles, className?: string) => {
    return {
        root: mergeStyles("moment-field", className, styles.root),
        inputContainer: mergeStyles("moment-field-input-container", styles.inputContainer),
        textField: mergeStyles("moment-field-text-field", styles.textField),
        calendarButtonContainer: mergeStyles("moment-field-calendar-container", styles.calendarButtonContainer),
        calendarButton: mergeStyles("moment-field-calendar-button", styles.calendarButton)
    };
});

export { IMomentFieldClassNames, getClassNames }