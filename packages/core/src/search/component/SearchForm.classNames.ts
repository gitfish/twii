import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { ISearchFormStyles } from "./SearchForm.styles";

interface ISearchFormClassNames {
    root?: string;
    formInput?: string;
    formActions?: string;
    prefix?: string;
    content?: string;
    suffix?: string;
    textSearch?: string;
    textSearchContainer?: string;
    inputContainer?: string;
    group?: string;
    groupContent?: string;
    childGroup?: string;
    childGroupContent?: string;
    fieldsContainer?: string;
    fieldContainer?: string;
    fieldSelectContainer?: string;
    fieldValueContainer?: string;
    fieldRemoveContainer?: string;
    searchActions?: string;
}

const getClassNames = memoizeFunction((styles : ISearchFormStyles, className?: string) : ISearchFormClassNames => {
    return mergeStyleSets({
        root: ["search-form", styles.root, className],
        formInput: ["search-form-input", styles.formInput],
        prefix: ["search-form-prefix", styles.prefix],
        content: ["search-form-content", styles.content],
        suffix: ["search-form-suffix", styles.suffix],
        textSearch: ["search-form-text-search", styles.textSearch],
        textSearchContainer: ["search-form-text-search-container", styles.textSearchContainer],
        inputContainer: ["search-form-input-container", styles.inputContainer],
        group: ["search-form-group", styles.group],
        groupContent: ["search-form-group-content", styles.groupContent],
        childGroup: ["search-form-child-group", styles.childGroup],
        childGroupContent: ["search-form-child-group-content", styles.childGroupContent],
        fieldsContainer: ["search-form-fields-container", styles.fieldsContainer],
        fieldContainer: ["search-form-field-container", styles.fieldContainer],
        fieldSelectContainer: ["search-form-field-select-container", styles.fieldSelectContainer],
        fieldValueContainer: ["search-form-field-value-container", styles.fieldValueContainer],
        fieldRemoveContainer: ["search-form-field-remove-container", styles.fieldRemoveContainer],
        searchActions: ["search-form-actions", styles.searchActions]
    });
});

export { ISearchFormClassNames, getClassNames }