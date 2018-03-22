import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IValidationErrorsStyles } from "./ValidationErrors.styles";

interface IValidationErrorsClassNames {
    root?: string;
    error?: string;
    errorLabel?: string;
}

const getClassNames = memoizeFunction((styles : IValidationErrorsStyles, className?: string) => {
    return {
        root: mergeStyles("validation-errors", className, styles.root),
        error: mergeStyles("validation-errors-error", styles.error),
        errorLabel: mergeStyles("validation-errors-error-label", styles.errorLabel)
    };
});

export { IValidationErrorsClassNames, getClassNames }
