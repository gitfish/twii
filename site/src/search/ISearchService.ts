import ISearchRequest from "./ISearchRequest";
import ISearchResponse from "./ISearchResponse";

interface ISearchService {
    search(request : ISearchRequest) : Promise<ISearchResponse>;
}

export { ISearchService as default, ISearchService }