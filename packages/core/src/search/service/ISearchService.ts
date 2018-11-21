import { ISearchResponse } from "../ISearchResponse";
import { ISearchRequest } from "../ISearchRequest";

interface ISearchService<D = any> {
    search(request : ISearchRequest, opts?: any) : Promise<ISearchResponse<D>>;
}

export {
    ISearchService
}