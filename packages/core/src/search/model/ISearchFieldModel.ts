import { ISearchField } from "../ISearchField";
import { ISearchFieldHostModel } from "./ISearchFieldHostModel";
import { SearchOperator } from "../SearchOperator";

interface ISearchFieldModel extends ISearchField {
    parent : ISearchFieldHostModel;
    setName(name : string) : void;
    setOperator(operator : SearchOperator) : void;
    setSearchString(searchString : string) : void;
    data : ISearchField;
    setData(data : ISearchField) : void;
    isSpecified : boolean;
    remove() : void;
 }

export { ISearchFieldModel }