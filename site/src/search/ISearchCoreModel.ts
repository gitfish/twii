import ISync from "common/ISync";
import ISearchRequest from "./ISearchRequest";

interface ISearchCoreModel {
    id: string;
    name: string;
    sync: ISync;
    request: ISearchRequest;
    sortBy: string;
    sortDescending: boolean;
    offset: number;
    limit: number;
    total: number;
    items: any[];
    
    refresh() : Promise<any>;
    search(request : ISearchRequest) : Promise<any>;
    setOffset(offset : number) : void;
    setLimit(limit : number) : void;
    setSortBy(sortBy : string) : void;
    setSortDescending(sortDescending : boolean) : void;
    pageCount : number;
    pageOffset : number;
    hasNext : boolean;
    next() : void;
    isLast : boolean;
    last() : void;
    hasPrev : boolean;
    prev() : void;
    isFirst : boolean;
    first() : void;
}

export { ISearchCoreModel as default, ISearchCoreModel }