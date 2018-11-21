import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IValidationErrorsStyles } from "./ValidationErrors.styles";

interface IValidationErrorsClassNames {
    root?: string;
    error?: string;
    errorLabel?: string;
}

const getClassNames = memoizeFunction((styles : IValidationErrorsStyles, className?: string) => {
    return mergeStyleSets({
        root: ["validation-errors", className, styles.root],
        error: ["validation-errors-error", styles.error],
        errorLabel: ["validation-errors-error-label", styles.errorLabel]
    });
});

export { IValidationErrorsClassNames, getClassNames }
