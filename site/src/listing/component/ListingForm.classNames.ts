import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingFormStyles } from "./ListingForm.styles";

interface IListingFormClassNames {
    root?: string;
    editor?: string;
    actions?: string;
}

const getClassNames = memoizeFunction((styles : IListingFormStyles) => {
    return {
        root: mergeStyles("app-listing-form", styles.root),
        editor: mergeStyles("app-listing-form-editor", styles.editor),
        actions: mergeStyles("app-listing-form-actions", styles.actions)
    };
});

export { IListingFormClassNames, getClassNames }