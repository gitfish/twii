import { ISearchField } from "./ISearchField";
import { SearchGroupOperator } from "./SearchGroupOperator";

interface ISearchGroup {
    op?: SearchGroupOperator;
    fields?: ISearchField[];
    groups?: ISearchGroup[];
}

export { ISearchGroup }