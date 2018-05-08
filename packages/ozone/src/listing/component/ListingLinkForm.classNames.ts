import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IListingLinkFormStyles } from "./ListingLinkForm.styles";

interface IListingLinkFormClassNames {
    root?: string;
    editor?: string;
    editors?: string;
    nameField?: string;
    urlField?: string;
    removeAction?: string;
    actions?: string;
}

const getClassNames = memoizeFunction((styles : IListingLinkFormStyles, className?: string) => {
    return {
        root: mergeStyles("app-listing-link-form", styles.root, className),
        editor: mergeStyles("app-listing-link-form-editor", styles.editor),
        editors: mergeStyles("app-listing-link-form-editors", styles.editors),
        nameField: mergeStyles("app-listing-link-form-name-field", styles.nameField),
        urlField: mergeStyles("app-listing-link-form-url-field", styles.urlField),
        removeAction: mergeStyles("app-listing-link-form-remove-action", styles.removeAction),
        actions: mergeStyles("app-listing-link-form-actions", styles.actions)
    };
});

export { IListingLinkFormClassNames, getClassNames }