import { ISearchRequest } from "../ISearchRequest";
import { SearchGroupOperator } from "../SearchGroupOperator";
import { ISearchGroupModel } from "./ISearchGroupModel";
import { ISearchFieldModel } from "./ISearchFieldModel";

interface ISearchRequestModel extends ISearchRequest, ISearchGroupModel {
    searchString: string;
    fields : ISearchFieldModel[];
    groups : ISearchGroupModel[];
    isComplex?: boolean;
    data : ISearchRequest;
    isSpecified : boolean;
    setSearchString(search : string) : void;
    setData(data : ISearchRequest) : void;
    setOp(op : SearchGroupOperator) : void;
    setComplex(complex : boolean) : void;
    clear() : void;
    reset() : void;
}

export { ISearchRequestModel }