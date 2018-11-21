import { SearchOperator } from "./SearchOperator";

interface ISearchField {
    name: string;
    operator?: SearchOperator;
    searchString: string;
}

export { ISearchField }