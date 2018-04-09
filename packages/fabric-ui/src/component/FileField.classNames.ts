import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IFileFieldStyles } from "./FileField.styles";

interface IFileFieldClassNames {
    root?: string;
    wrapper?: string;
    selector?: string;
    selectorAction?: string;
}

const getClassNames = memoizeFunction((styles : IFileFieldStyles, className : string) => {
    return {
        root: mergeStyles("file-field", className, styles.root),
        wrapper: mergeStyles("file-field-wrapper", styles.wrapper),
        selector: mergeStyles("file-field-selector", styles.selector),
        selectorAction: mergeStyles("file-field-selector-action", styles.selectorAction)
    };
});

export { IFileFieldClassNames, getClassNames }