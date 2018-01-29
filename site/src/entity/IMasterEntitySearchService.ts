import IMasterEntitySearchResultItem from "./IMasterEntitySearchResultItem";
import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
import IMasterEntitySearchResult from "./IMasterEntitySearchResult";

interface IMasterEntitySearchService {
    search(request : IMasterEntitySearchRequest) : Promise<IMasterEntitySearchResult>;
}

export { IMasterEntitySearchService as default, IMasterEntitySearchService, IMasterEntitySearchRequest };