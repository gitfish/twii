import IMasterEntitySearchResultItem from "./IMasterEntitySearchResultItem";

interface IMasterEntitySearchResult {
    items: IMasterEntitySearchResultItem[];
    hasMoreRows: boolean;
}

export { IMasterEntitySearchResult as default, IMasterEntitySearchResult };