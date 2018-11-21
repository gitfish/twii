import ISync from "../../ISync";
import { PagingMode } from "../PagingMode";

interface IPageableModel {
    sync : ISync;
    total : number;
    offset : number;
    limit : number;
    offsetLimit : number;
    pagingMode : PagingMode;
    pageCount : number;
    pageOffset : number;
    hasNext : boolean;
    isLast : boolean;
    hasPrevious : boolean;
    isFirst : boolean;
    hasReachedOffsetLimit : boolean;
    isOffsetPagingMode : boolean;
    isCursorPagingMode : boolean;
    isAppend : boolean;
    setOffsetLimit(rowLimit : number) : void;
    setOffset(offset : number) : Promise<any>;
    setLimit(limit : number) : Promise<any>;
    setPageOffset(pageOffset : number) : Promise<any>;
    setPagingMode(pagingMode : PagingMode) : void;
    next() : Promise<any>;
    last() : Promise<any>;
    previous() : Promise<any>;
    first() : Promise<any>;
    setAppend(append : boolean) : void;
}

export { IPageableModel }